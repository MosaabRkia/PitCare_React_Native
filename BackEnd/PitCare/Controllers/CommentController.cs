using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using Dapper;
using PitCare.Models;

namespace PitCare.Controllers
{
    public class CommentController : ApiController
    {
#if DEBUG
        readonly static string serverName = "local";
#else
             static string serverName = "server";
#endif

        [HttpGet]
        [Route("api/getComments/{postId_}")]
        public IEnumerable<Comment> GetCommentOfPost(int postId_)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    return db.Query<Comment>("getCommentsOfPost", new { postId = postId_ }, commandType: CommandType.StoredProcedure);

                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }
            }
        }

        [HttpGet]
        [Route("api/RemoveComment/{id_}")]
        public IHttpActionResult RemoveCommentOfPost(int id_)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<Comment>("RemoveComment", new { id = id_ }, commandType: CommandType.StoredProcedure);
                    return Ok(true);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }
            }
        }

        [HttpPost]
        [Route("api/Comment/Add")]
        public bool addComment([FromBody] Comment comment)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<Comment>("AddComment", new { userId = comment.userId, postId = comment.postId, commentText = comment.commentText, commentDate = DateTime.Now }, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return false;
                }
            }



        }

        [HttpGet]
        [Route("api/getFirstLastName/{userId_}")]
        public IEnumerable<User> GetFirstLastName(int userId_)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    return db.Query<User>("GetFirstAndLastName", new { userId = userId_ }, commandType: CommandType.StoredProcedure);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }

            }
        }

    }
}