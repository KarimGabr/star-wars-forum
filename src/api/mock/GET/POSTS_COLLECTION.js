const POSTS_COLLECTION = {
  data: [
    {
      id: 1,
      author: { id: 1, username: "Darth Vader" },
      date: "10-30-2010",
      title: "The Empire Strikes Back",
      content:
        "Join me and together we will rule the galaxy as father and son. Luke, I am your father.",
      comments_n: 3,
      votes: 8754,
    },
    {
      id: 2,
      author: { id: 2, username: "Luke Skywalker" },
      date: "10-30-2010",
      title: "The Last Jedi",
      content: "Strike Me Down In Anger And I'll Always Be With You.",
      comments_n: 0,
      votes: 1460,
    },
    {
      id: 3,
      author: { id: 3, username: "Obi-Wan Kenobi" },
      date: "10-30-2010",
      title: "Revenge of the Sith",
      content: "It's over Anakin. I have the high ground.",
      comments_n: 1,
      votes: 5678,
    },
    {
      id: 4,
      author: { id: 4, username: "Darth Maul" },
      date: "10-30-2010",
      title: "The Phantom Menace",
      content:
        "At last we will reveal ourselves to the Jedi. At last we will have revenge.",
      comments_n: 0,
      votes: 542,
    },
    {
      id: 5,
      author: { id: 5, username: "Emperor Palpatine" },
      date: "10-30-2010",
      title: "Revenge of the Sith",
      content: "UNNLIMITEEED POOOOOOOOOWEEEEEEEEEEEEEEEEEEEEEEEEEER!!!!",
      comments_n: 0,
      votes: 9000,
    },
  ],
};

export default POSTS_COLLECTION;
