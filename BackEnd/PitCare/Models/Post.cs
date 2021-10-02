using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PitCare.Models
{
    public class Post
    {

        // automatic post Id
        public int postId { get; set; }
        public int userId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string photos { get; set; }
        public string catalogType { get; set; } //dog - cat - other
        public DateTime postDate { get; set; }
        public string typePost { get; set; } //advice - ask - photo



    }
}