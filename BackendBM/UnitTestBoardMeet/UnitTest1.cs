using BoardMeet.Models;

namespace UnitTestBoardMeet
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestBoardGameModel()
        {
            BoardGameCreateDTO boardgame = new BoardGameCreateDTO();

            BoardGame bg = new BoardGame(boardgame);
            Comment comment = new Comment();
            comment.WeightGame = 3;
            comment.AgePlayer = 12;
            comment.BestPlayerMax = 5;
            comment.BestPlayerMin = 2;
            comment.Rating = 4;

            bg.AddRaitingData(comment);
            Assert.AreEqual(1, bg.ÑountComment);
            Assert.AreEqual(comment.WeightGame, bg.WeightGameUser);
            Assert.AreEqual(comment.AgePlayer, bg.AgePlayerUser);
            Assert.AreEqual(comment.BestPlayerMax, bg.BestRangeOfPlayersMaxUser);
            Assert.AreEqual(comment.BestPlayerMin, bg.BestRangeOfPlayersMinUser);
            Assert.AreEqual(comment.Rating, bg.RatingUser);

            Comment comment2 = new Comment();
            comment2.GameId = 2;
            comment2.WeightGame = 4;
            comment2.AgePlayer = 5;
            comment2.BestPlayerMax = 4;
            comment2.BestPlayerMin = 2;
            comment2.Rating = 2;

            bg.AddRaitingData(comment2);

            Assert.AreEqual(2, bg.ÑountComment);
            Assert.AreEqual((double)(comment.WeightGame + comment2.WeightGame) / 2, bg.WeightGameUser);
            Assert.AreEqual((double)(comment.AgePlayer + comment2.AgePlayer) / 2, bg.AgePlayerUser);
            Assert.AreEqual((double)(comment.BestPlayerMax + comment2.BestPlayerMax) / 2, bg.BestRangeOfPlayersMaxUser);
            Assert.AreEqual((double)(comment.BestPlayerMin + comment2.BestPlayerMin) / 2, bg.BestRangeOfPlayersMinUser);
            Assert.AreEqual((double)(comment.Rating + comment2.Rating) / 2, bg.RatingUser);

            bg.RemoveRaitingData(comment2);

            Assert.AreEqual(1, bg.ÑountComment);
            Assert.AreEqual(comment.WeightGame, bg.WeightGameUser);
            Assert.AreEqual(comment.AgePlayer, bg.AgePlayerUser);
            Assert.AreEqual(comment.BestPlayerMax, bg.BestRangeOfPlayersMaxUser);
            Assert.AreEqual(comment.BestPlayerMin, bg.BestRangeOfPlayersMinUser);
            Assert.AreEqual(comment.Rating, bg.RatingUser);
        }
        [Test]
        public void TestMeetModel()
        {
            MeetCreateDTO m = new MeetCreateDTO();
            Meet meet = new Meet();
            meet.PeopleCountMax = 10;
            meet.PeopleCount = meet.PeopleCountMax - 1;
            meet.Duration = 240;
            meet.Date = DateTime.Now.AddMinutes(1);
            meet.RefreshState();

            Assert.AreEqual(Meet.Recruiting, meet.State);

            meet.PeopleCount = meet.PeopleCountMax;
            meet.RefreshState();
            Assert.AreEqual(Meet.RecruitingFull, meet.State);

            meet.PeopleCount--;
            meet.Date = DateTime.Now;
            meet.RefreshState();
            Assert.AreEqual(Meet.StartOpen, meet.State);

            meet.Lock();

            Assert.AreEqual(Meet.StartLock, meet.State);

            meet.Open();
            Assert.AreEqual(Meet.StartOpen, meet.State);

            meet.PeopleCount = meet.PeopleCountMax;
            meet.RefreshState();
            Assert.AreEqual(Meet.StartFull, meet.State);

            meet.Date = DateTime.Now.AddMinutes(-(meet.Duration));
            meet.RefreshState();
            Assert.AreEqual(Meet.Finished, meet.State);
        }
    }
}