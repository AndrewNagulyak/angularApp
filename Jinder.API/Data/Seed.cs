using System;
using System.Collections.Generic;
using Jinder.API.Model;
using Newtonsoft.Json;

namespace Jinder.API.Data
{
    public class Seed
    {
        private readonly DataDbContext _contex;
        public Seed(DataDbContext contex)
        {
            _contex = contex;


        }

        public void SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/user.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
                 Console.WriteLine("here");

             foreach (var user in users )
             {
                 byte[] passwordHash, passwordSalt;
                 CreatePasswordHash("pasword",out passwordHash, out passwordSalt);
                 user.PasswordHash = passwordHash;
                 user.PasswordSalt = passwordSalt;
                 user.Username = user.Username.ToLower();
                 Console.WriteLine(user);
                 _contex.Add(user);
             }
             _contex.SaveChanges();
        }
          private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        
    }
}