using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json.Linq;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace BoardMeet.Models
{
    public class Meet : BaseEntity
    {
        public static readonly string Recruiting = "Recruiting";
        public static readonly string RecruitingFull = "RecruitingFull";
        public static readonly string StartOpen = "StartOpen";
        public static readonly string StartLock = "StartLock";
        public static readonly string StartFull = "StartFull";
        public static readonly string Finished = "Finished";
        public string Name { get; set; }
        public int PeopleCount { get; set; }
        public int PeopleCountMax { get; set; }
        public int Duration { get; set; }
        public string? Link { get; set; }
        public DateTime Date { get; set; }
        public string State { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string Games { get; set; }
        public int AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public User? Author { get; set; }
        public virtual List<User>? Players { get; set; }
        public Meet() { }
        public Meet(MeetCreateDTO dto) 
        {
            Name = dto.Name;
            PeopleCount = 0;
            PeopleCountMax = dto.PeopleCountMax;
            Duration = dto.Duration;
            Link = dto.Link;
            Date = dto.Date;
            Location = dto.Location;
            City = dto.City;
            Games = dto.Games;
            AuthorId = dto.AuthorId;
            State = Recruiting;

        }
        public void Change(MeetChangeDTO dto) 
        {
            Name = dto.Name;
            PeopleCount = Players.Count();
            PeopleCountMax = dto.PeopleCountMax;
            Duration = dto.Duration;
            Link = dto.Link;
            Date = dto.Date;
            Location = dto.Location;
            City = dto.City;
            Games = dto.Games;
            Players = dto.Players;
        }

        public void RefreshState() 
        {
            DateTime now = DateTime.Now;
            if(now > Date.AddMinutes(Duration)) 
            {
                State = Finished;
                return;
            }
            else if (PeopleCount < PeopleCountMax && now < Date) 
            {
                State = Recruiting;
                return;
            }
            else if(PeopleCount >= PeopleCountMax && now < Date)
            {
                State = RecruitingFull;
                return;
            }
            else if (PeopleCount < PeopleCountMax && now > Date && State != StartLock)
            {
                State = StartOpen;
                return;
            }
            else if(PeopleCount >= PeopleCountMax && now > Date) 
            {
                State = StartFull;
                return;
            }
        }
        public bool Lock() 
        {
            if(State ==StartOpen) 
            {
                State= StartLock;
                return true;
            }
            return false;
        }

        public bool Open()
        {
            if (State == StartLock)
            {
                State = StartOpen;
                return true;
            }
            return false;
        }

        public  bool Visibility() 
        {
            if(State == StartOpen || State == Recruiting) 
            {
                return true;
            }
            return false;
        }

        public bool Removed() 
        {
            if (State == Recruiting || State == Finished) 
            {
                return true;
            }
            return false;
        }

    }

    public class MeetCreateDTO 
    {
        public string Name { get; set; }
        public int PeopleCountMax { get; set; }
        public int Duration { get; set; }
        public string? Link { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string Games { get; set; }
        public int AuthorId { get; set; }
    }
    public class MeetChangeDTO
    {
        public string Name { get; set; }
        public int PeopleCountMax { get; set; }
        public int Duration { get; set; }
        public string? Link { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string Games { get; set; }
        public List<User>? Players { get; set; }

    }
   

}