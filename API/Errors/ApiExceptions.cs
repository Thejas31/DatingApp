using System;

namespace API.Errors;

public class ApiExceptions(int StatusCode, string Message, String Details)
{
    public int statusCode {get; set;} = StatusCode;
    public string Message {get; set;} = Message;
    public string? Details {get; set;} = Details;
}
