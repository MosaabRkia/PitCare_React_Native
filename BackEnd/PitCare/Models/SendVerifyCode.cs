using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PitCare.Models
{
    public class SendVerifyCode
    {
        private string email;
        private int code;
        public SendVerifyCode(string email)
        {
            this.email = email;
            Random rnd = new Random();
            int newCode = rnd.Next(10001, 99999);
            code = newCode;
        }

        public int GetCode()
        {
            return code;
        }

        public void SetCode(int value)
        {
            code = value;
        }

        public string GetEmail()
        {
            return email;
        }

        public void SetEmail(string value)
        {
            email = value;
        }
    }
}