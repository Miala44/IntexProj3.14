using Microsoft.AspNetCore.Identity;
namespace RootkitAuth.API.Data
{
    public class NoOpEmailSender<TUser> : IEmailSender<TUser> where TUser : class
    {
        public Task SendConfirmationLinkAsync(TUser user, string email, string confirmationLink)
        {
            // No-op (does nothing)
            return Task.CompletedTask;
        }
        public Task SendPasswordResetLinkAsync(TUser user, string email, string resetLink)
        {
            // No-op (does nothing)
            return Task.CompletedTask;
        }
        public Task SendPasswordResetCodeAsync(TUser user, string email, string resetCode)
        {
            // Optional: If you're not supporting this method, throw:
            throw new NotImplementedException();
            // Or implement it as a no-op like the others:
            // return Task.CompletedTask;
        }
        public Task SendEmailAsync(TUser user, string email, string subject, string htmlMessage)
        {
            // No-op (does nothing)
            return Task.CompletedTask;
        }
    }
}