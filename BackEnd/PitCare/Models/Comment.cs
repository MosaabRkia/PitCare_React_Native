using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PitCare.Models
{
    public class Comment
    {
        public int postId { get; set; }
        public string commentText { get; set; }
        public DateTime commentDate { get; set; }
        public int commentId { get; set; }
        public int userId { get; set; }

    }
}