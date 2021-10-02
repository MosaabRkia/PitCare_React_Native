using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PitCare.Models
{
    public class User
    {
        //user id automatic
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int rankId { get; set; }
        public int userId { get; set; }
        public DateTime birthdate { get; set; }
        public string notificationCode { get; set; }

    }
}