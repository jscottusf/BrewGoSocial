﻿//using System;
//using System.IO;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace BrewGoSocial.Controllers
//{
//    [Route("api/uploadimg")]
//    [ApiController]
//    public class ImageUploadController : ControllerBase
//    {
//        public static IWebHostEnvironment _environment;

//        public ImageUploadController(IWebHostEnvironment environment)
//        {
//            _environment = environment;
//        }

//        public class FileUploadAPI
//        {
//            public IFormFile files { get; set; }
//        }

//        public async Task<string> Post(FileUploadAPI objFile)
//        {
//            try
//            {
//                if (objFile.files.Length > 0)
//                {
//                    if (!Directory.Exists(_environment.WebRootPath + "\\Upload\\"))
//                    {
//                        Directory.CreateDirectory(_environment.WebRootPath + "\\Upload\\");
//                    }
//                    using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + "\\Upload\\" + objFile.files.FileName))
//                    {
//                        objFile.files.CopyTo(fileStream);
//                        fileStream.Flush();
//                        return "\\Uplaod\\" + objFile.files.FileName;
//                    }
//                }
//                else
//                {
//                    return "Failed";
//                }
//            }
//            catch(Exception ex)
//            {
//                return ex.Message.ToString();
//            }
            
//        }
//    }
//}
