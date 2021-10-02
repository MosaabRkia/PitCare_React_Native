using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;
using PitCare.Models;
using System.Net.Mail;
using System.Text;
using System.Data;
using System.Configuration;
using Dapper;

namespace PitCare.Controllers
{
    public class SendVerifyController : ApiController
    {
#if DEBUG
       readonly static string serverName = "local";
#else
       static string serverName = "server";
#endif

        [HttpPost]
        [Route("api/SendCodeVerify/verify/register")]
        public IHttpActionResult SendCodeVerifyRegister([FromBody] SendVerifyCode e)
        {
            bool found = false;
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {

                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    IEnumerable<User> allEmail = db.Query<User>("SELECT [email] FROM [User] ");
                    foreach (User item in allEmail)
                    {
                        if (item.email.Equals(e.GetEmail()))
                        {
                            found = true;
                        }
                    }
                    if (e.GetEmail() != "null" && !found && SendEmail(e.GetEmail(), $"your Code is : {e.GetCode()}"))
                    {
                        return Ok(e.GetCode());
                    }
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return Ok(false);
                }
            }
            return Ok(false);
        }

        [HttpPost]
        [Route("api/SendCodeVerify/verify")]
        public IHttpActionResult SendCodeVerify([FromBody] SendVerifyCode e)
        {
            bool found = false;
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {

                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    IEnumerable<User> allEmail = db.Query<User>("SELECT [email] FROM [User] ");
                    foreach (User item in allEmail)
                    {
                        if (item.email.Equals(e.GetEmail()))
                        {
                            found = true;
                        }
                    }
                    if (e.GetEmail() != "null" && found && SendEmail(e.GetEmail(), $"your Code is : {e.GetCode()}"))
                    {
                        return Ok(e.GetCode());
                    }
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return Ok(false);
                }
            }
            return Ok(false);
        }

        [HttpPost]
        [Route("api/GetPw/verify")]
        public IHttpActionResult SendPwToEmailVerify([FromBody] SendVerifyCode e)
        {
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings[serverName].ConnectionString))
            {

                if (db.State == ConnectionState.Closed)
                    db.Open();
                try
                {
                    IEnumerable<User> pw = db.Query<User>("GetPassword", new { email = e.GetEmail() }, commandType: CommandType.StoredProcedure);
                    foreach (var item in pw)
                    {
                        if (SendEmail(e.GetEmail(), $"Your Password is {item.password}"))
                            return Ok(true);
                    }

                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return Ok(false);
                }
            }
            return Ok(false);
        }


        [HttpPost]
        [Route("api/Send/sucessfully/register")]
        public IHttpActionResult sendRegistered([FromBody] SendVerifyCode e)
        {
                    if (e.GetEmail() != "null" &&  SendEmail(e.GetEmail(), $"\n thanks for using our app we are happy to meet your pet/pets\nplease if you face any problem reply to us in this email\nfeel free to ask .."))
                    {
                        return Ok(true);
                    }
                        return Ok(false);
        }

        public bool SendEmail(string email, string msg)
        {
            string from = "PitCare.verifiy@gmail.com"; //From address 
            string to = email; //To address    
            MailMessage message = new MailMessage(from, to);
            string mailbody = msg;
            message.Subject = "PitCare App";
            message.Body = mailbody;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp    
            System.Net.NetworkCredential basicCredential1 = new
            System.Net.NetworkCredential("PitCare.verifiy@gmail.com", "PitCare123");
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;
            try
            {
                client.Send(message);
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return true;
        }
    }
}