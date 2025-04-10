using System;
using System.Collections.Generic;
namespace RootkitAuth.API.Data.NewDbModels;
public partial class RateShowDto
{
    public string ShowId { get; set; } = string.Empty;
    public int Rating { get; set; }
}