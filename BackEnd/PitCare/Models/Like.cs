using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PitCare.Models
{
    public class Like
    {
        public int likeId { get; set; }
        public int userId { get; set; }
        public int postId { get; set; }
    }
}