using BoardMeet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("corspolicy",builder =>
                      {
                          builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
                      });
});



// /////////////////


var key = "lectureTest1234$$$";

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
        ValidateIssuer = false,
        ValidateAudience = false,

    };
});


builder.Services.AddSingleton<JwtAuthenticationManager>(new JwtAuthenticationManager(key));
builder.Services.AddSingleton<RegistrationManager>(new RegistrationManager());

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("BoardMeetContextConnection"), new MySqlServerVersion(new Version(8, 0, 30))
    );
    options.ConfigureWarnings(w => w.Ignore(CoreEventId.NavigationBaseIncludeIgnored));

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("corspolicy");

app.UseStaticFiles(new StaticFileOptions() // обрабатывает запросы к каталогу wwwroot/html
{
    FileProvider = new PhysicalFileProvider(
            Path.Combine("C:\\Users\\maxus\\OneDrive\\images", "" )),
    RequestPath = new PathString("/api/images")
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
