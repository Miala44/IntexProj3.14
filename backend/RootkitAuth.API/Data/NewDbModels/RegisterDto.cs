using System;
using System.Collections.Generic;
namespace RootkitAuth.API.Data.NewDbModels;
public partial class RegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public int Netflix { get; set; }
    public int AmazonPrime { get; set; }
    public int DisneyPlus { get; set; }
    public int ParamountPlus { get; set; }
    public int Max { get; set; }
    public int Hulu { get; set; }
    public int AppleTV { get; set; }
    public int Peacock { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public int Zip { get; set; }
}






