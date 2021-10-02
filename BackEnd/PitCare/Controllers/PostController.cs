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
    public class PostController : ApiController
    {
#if DEBUG
        readonly static string serverName = "local";
#else
                     static string serverName = "server";
#endif

        [HttpPost]
        [Route("api/NewPost/Add")]
        public IHttpActionResult AddPost([FromBody] Post newPost)
        {
            if (newPost == null)
                return null;

            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<Post>("AddPost", new { userId = newPost.userId, title = newPost.title, description = newPost.description, photos = newPost.photos, catalogType = newPost.catalogType, @postDate = DateTime.Now, typePost = newPost.typePost }, commandType: CommandType.StoredProcedure);
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
        [Route("api/RemovePost/{postId}")]
        public IHttpActionResult RemovePost(int postId)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    db.Query<Comment>("RemovePost", new { id = postId }, commandType: CommandType.StoredProcedure);
                    return Ok(true);
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return null;
                }
            }
        }

        //get all posts by catalog and type
        [HttpGet]
        [Route("api/getPosts/{catalog}/{type}")]
        public IEnumerable<Post> GetPostsByCatalogAndType(string catalog, string type)
        {

            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    return db.Query<Post>("GetPosts", new { catalogType = catalog, typePost = type }, commandType: CommandType.StoredProcedure);
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