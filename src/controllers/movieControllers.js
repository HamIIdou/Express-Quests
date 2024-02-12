const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const database = require("../../database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([result]) => {
      // Si aucun film n'est retourné, renvoyer un statut 404
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // S'il y a un film retourné, renvoyer l'objet film
      const movie = result[0];
      return res.json(movie);
    })
    .catch((error) => {
      console.error("Error retrieving movie:", error);
      // Renvoyer un statut 500 pour toute erreur
      return res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
