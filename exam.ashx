<%@ WebHandler Language="C#" Class="api" %>

using System;
using System.Web;
using System.Linq;
using System.IO;

public class api : IHttpHandler {
    string apiid;
    public void ProcessRequest (HttpContext context) {
        string imageNmae = null;
        var httpRequest = HttpContext.Current.Request;

        var postedFile = httpRequest.Files["Image"];
        apiid = httpRequest.Params["apiid"];
        if (postedFile != null)
        {
            if (apiid == "vehicles")
            {
                imageNmae = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).ToArray());
                imageNmae = imageNmae + Path.GetExtension(postedFile.FileName);
                var filepath = HttpContext.Current.Server.MapPath("~/assets/images/vehicals/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
            else if (apiid == "profile")
            {
                imageNmae = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).ToArray());
                imageNmae = imageNmae + Path.GetExtension(postedFile.FileName);
                var filepath = HttpContext.Current.Server.MapPath("~/assets/images/profile/" + imageNmae);
                postedFile.SaveAs(filepath);
            }
        }
        else
        {
            if (apiid == "Attendance")
            {
                var nvc = HttpContext.Current.Request.Form;
                string encodedImage = nvc["encoded_img"];
                string imgname = nvc["imgname"];
                byte[] imageBytes = Convert.FromBase64String(encodedImage);
                MemoryStream ms = new MemoryStream(imageBytes);
                ms.Write(imageBytes, 0, imageBytes.Length);

                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                image.Save(HttpContext.Current.Server.MapPath("~/assets/image/users/attendance/" + imgname));

            }
            else if (apiid == "Visiting")
            {
                var nvc = HttpContext.Current.Request.Form;
                string encodedImage = nvc["encoded_img"];
                string imgname = nvc["imgname"];
                byte[] imageBytes = Convert.FromBase64String(encodedImage);
                MemoryStream ms = new MemoryStream(imageBytes);
                ms.Write(imageBytes, 0, imageBytes.Length);

                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                image.Save(HttpContext.Current.Server.MapPath("~/assets/image/users/visiting/" + imgname));

            }
            else
            {
                HttpFileCollection hfc = HttpContext.Current.Request.Files;
                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    System.Web.HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        string FileName = (Path.GetFileName(hpf.FileName));
                        if (!File.Exists("~/assets/image/buysell/" + FileName))
                        {
                            hpf.SaveAs("~/assets/image/buysell/" + FileName);
                        }
                    }
                }
            }
        }
    }

    //imageNmae = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
    //imageNmae = imageNmae + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
    //var filepath = HttpContext.Current.Server.MapPath("~/Image/" + imageNmae);
    //postedFile.SaveAs(filepath);

    public bool IsReusable {
        get {
            return false;
        }
    }

}