using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using BrewGoSocial.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using BrewGoSocial.Services;
using BrewGoSocial.Entities;
using BrewGoSocial.Models;
using BrewGoSocial.Models.Users;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using System.IO;

namespace BrewGoSocial.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info and authentication token
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CreatedDate = user.CreatedDate,
                UpdatedDate = user.UpdatedDate,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<User>(model);

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var model = _mapper.Map<IList<UserModel>>(users);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            //reverse the posts into desc order
            user.Posts.Reverse();
            var model = _mapper.Map<UserModel>(user);
            return Ok(model);
        }

        [HttpGet("slugs/{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            var user = _userService.GetBySlug(slug);
            if (user == null)
            {
                return NotFound();
            }
            //reverse the posts into desc order
            user.Posts.Reverse();
            var model = _mapper.Map<PublicUserModel>(user);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                _userService.Update(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }

        // api/users/QueryByName?query={firstName}%20{lastName} or username
        [HttpGet("[action]")]
        public IActionResult QueryByName([FromQuery]string query)
        {
            var users = _userService.QueryByName(query);
            var model = _mapper.Map<IList<PublicUserModel>>(users);
            return Ok(model);
        }



        [HttpPost("imgupload/{id}")]
        public async Task FileImageAsync(int id)
        {
            var s3Client = new AmazonS3Client(AWS_accessKey, AWS_secretKey, Amazon.RegionEndpoint.USEast1);

            try
            {
                var httpRequest = HttpContext.Request;
                //posted file
                var file = httpRequest.Form.Files[0];

                byte[] fileBytes = new byte[file.Length];
                file.OpenReadStream().Read(fileBytes, 0, Int32.Parse(file.Length.ToString()));

                var fileName = Guid.NewGuid() + file.FileName;
                //make sure the file is a photo image only
                string FileExtension = fileName.Substring(fileName.LastIndexOf('.') + 1).ToLower();
                if (FileExtension == "jpeg" || FileExtension == "jpg" || FileExtension == "png")
                {

                    PutObjectResponse response = null;

                    using (var stream = new MemoryStream())
                    {
                        file.CopyTo(stream);

                        var request = new PutObjectRequest
                        {
                            BucketName = AWS_bucketName,
                            Key = fileName,
                            InputStream = stream,
                            ContentType = file.ContentType,
                            CannedACL = S3CannedACL.PublicReadWrite
                        };

                        response = await s3Client.PutObjectAsync(request);
                        var imgUrl = string.Format("https://{0}.s3.amazonaws.com/{1}", AWS_bucketName, fileName);
                        var user = _userService.GetById(id);
                        user.Profile.ProfileImgUrl = imgUrl;
                        var posts = user.Posts;
                        foreach (var post in posts)
                        {
                            post.ProfileImgUrl = imgUrl;
                        }
                        var comments = _userService.GetCommentsByUserId(id);
                        if (comments == null)
                        {
                            _userService.SaveChanges();
                        }
                        foreach (var comment in comments)
                        {
                            comment.ProfileImgUrl = imgUrl;
                        }
                        _userService.SaveChanges();
                    };
                }
                else
                {
                    Console.WriteLine("Upload Failed: you can only upload images");
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Upload Failed: " + ex.Message);
            }

        }
    }
}

