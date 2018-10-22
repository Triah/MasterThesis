using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MasterThesisPlatform.Models;
using Microsoft.AspNetCore.Identity;
using MasterThesisPlatform.Data;

namespace MasterThesisPlatform.Controllers
{
    public class HomeController : Controller
    {

        //private readonly UserManager<ApplicationUser> userManager;

        private UserManager<ApplicationUser> userManager;

        public HomeController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public IActionResult Index()
        {
            if(this.userManager.GetUserAsync(HttpContext.User) != null)
            {
                var user = this.userManager.GetUserAsync(HttpContext.User);
                if(user.Result != null)
                {
                    if (user.Result.Role.Equals("Teacher"))
                    {
                        return View(CustomRoutes.TeacherIndex);
                    }
                    if (user.Result.Role.Equals("Developer"))
                    {
                        return View(CustomRoutes.DeveloperIndex);
                    }
                    if (user.Result.Role.Equals("Student"))
                    {
                        return View(CustomRoutes.StudentIndex);
                    }
                }
                
            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
