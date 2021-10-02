using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using Dapper;
using PitCare.Models;
using System.Linq;

namespace PitCare.Controllers
{
    public class LikeController : ApiController
    {

#if DEBUG
        readonly static string serverName = "local";
#else
             static string serverName = "server";
#endif

        [HttpPost]
        [Route("api/Like/addLike")]
        public IHttpActionResult addLike([FromBody] Like like)
        {

            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<Like>("addLike", new { userId = like.userId, postId = like.postId }, commandType: CommandType.StoredProcedure);
                    return Ok(true);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return Ok(false);
                }

            }
        }

        [HttpGet]
        [Route("api/Like/getAllLikes")]
        public IEnumerable<Like> getAllLikes()
        {

            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    IEnumerable<Like> likes = db.Query<Like>("getAllLikes", new { }, commandType: CommandType.StoredProcedure);
                    return likes;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }

            }
        }

        [HttpGet]
        [Route("api/Like/removeLike/{id}")]
        public IHttpActionResult removeLike(int id)
        {

            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<Like>("deleteLike", new { likeId = id }, commandType: CommandType.StoredProcedure);
                    return Ok(true);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return Ok(false);
                }

            }
        }


    }
}
