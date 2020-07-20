using AutoMapper;
using BrewGoSocial.Entities;
using BrewGoSocial.Models.Users;

namespace BrewGoSocial.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<User, PublicUserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();
        }
    }
}
