using Jinder.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Jinder.API.Data
{
    public class DataDbContext:DbContext
    {
     public DataDbContext(DbContextOptions<DataDbContext> options) : base (options)
     {
         
     }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}