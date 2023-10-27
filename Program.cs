using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TeslaRentingApp;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IModelRepository, ModelRepository>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<ICarRepository, CarRepository>();

// Add Swagger for testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuration for database connection
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Enable CORS
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
