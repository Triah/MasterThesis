﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Controllers
{
    public class TeacherController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult StudentsPage()
        {
            return View();
        }

        public IActionResult CreateGame()
        {
            return View();
        }
    }
}
