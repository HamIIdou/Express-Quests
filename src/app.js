const express = require("express");
const database = require("../database");

const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", movieControllers.postUsers);
// Route GET /api/users
app.get("/api/users", (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      // Renvoyer la liste des utilisateurs sous forme de réponse JSON
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      // En cas d'erreur, renvoyer un statut 500 avec un message d'erreur générique
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Route GET /api/users/:id
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([result]) => {
      // Si aucun utilisateur n'est trouvé, renvoyer un statut 404
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // S'il y a un utilisateur trouvé, renvoyer l'utilisateur correspondant en tant qu'objet JSON
      const user = result[0];
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      // En cas d'erreur, renvoyer un statut 500 avec un message d'erreur générique
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = app;
