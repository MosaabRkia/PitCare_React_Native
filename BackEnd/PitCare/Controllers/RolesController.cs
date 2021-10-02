using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;
using PitCare.Models;
using System.Data;
using System.Configuration;
using Dapper;

namespace PitCare.Controllers
{
    public class RolesController : ApiController
    {

#if DEBUG
       readonly static string serverName = "local";
#else
      static string serverName = "server";
#endif

        private IEnumerable<User> GetUsers()
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                { 
                    var test = db.Query<User>("getUsersSecret", new { }, commandType: CommandType.StoredProcedure);
                    return test;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }

            }

        }

        [HttpGet]
        [Route("api/user/rank/{id}")]
        public IEnumerable<User> GetUserRank(int id)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                  return  db.Query<User>("getRank", new { @id=id }, commandType: CommandType.StoredProcedure);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }

            }

        }


        [HttpPost]
        [Route("api/Register")]
        public IHttpActionResult Register([FromBody] User user)
        {
           

            foreach (User x in GetUsers())
            {
                if (x.email.Equals(user.email))
                {
                    return Ok(false);
                }
            }

            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<User>("CreateUser", new { firstName = user.firstName, lastName = user.lastName, email = user.email, password = user.password, rankId = 1, birthdate = user.birthdate , notificationCode = "test"}, commandType: CommandType.StoredProcedure);
                    return Ok(true);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return Ok(false);
                }

            }
        }
        [HttpPost]
        [Route("api/Login")]
        public int Login([FromBody] User checkUser)
        {
            //checkUser
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    IEnumerable<User> x = db.Query<User>("checkUser", new { email = checkUser.email, password = checkUser.password }, commandType: CommandType.StoredProcedure);
                    foreach (User item in x)
                    {
                        return item.userId;
                    }                 
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return 0;
                }
                return 0;

            }
   
        }

    }
}