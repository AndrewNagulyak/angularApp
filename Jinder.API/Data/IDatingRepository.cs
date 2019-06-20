using System.Collections.Generic;
using System.Threading.Tasks;
using Jinder.API.Model;

namespace Jinder.API.Data
{
    public interface IdatingRepository
    {
         void Add<T> (T entity) where T: class;
         void Delete<T> (T entity) where T: class;
         Task<bool> SaveAll(); 
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}