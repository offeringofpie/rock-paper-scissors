const Instructions = (props) => {
  return (
    <>
      <input type="checkbox" id="instructions" className="modal-toggle" />
      <label htmlFor="instructions" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="instructions"
            className="absolute right-4 top-2 text-lg">
            ✕
          </label>
          <h3 className="text-lg font-bold">Instructions:</h3>
          <p className="py-4">
            Rock-paper-scissors-lizard-Spock is an expansion of the classic game
            of rock-paper-scissors. In addition to the three original choices,
            there are two new options: lizard and Spock. This simulates an
            ultimate battle between many players.
          </p>
          <p className="py-4">
            As{" "}
            <a
              className="link link-primary"
              href="https://www.youtube.com/watch?v=Kov2G0GouBw&t=38s"
              target="_blank">
              Sheldon explains
            </a>{" "}
            in the TV series Big Bang Theory,
            <strong className="text-accent">
              "Scissors cuts paper, paper covers rock, rock crushes lizard,
              lizard poisons Spock, Spock smashes scissors, scissors decapitates
              lizard, lizard eats paper, paper disproves Spock, Spock vaporizes
              rock, and as it always has, rock crushes scissors."
            </strong>
          </p>
          <p className="py-4">
            Inspired by{" "}
            <a
              className="link link-primary"
              href="https://twitter.com/juanbuis/status/1600155605112496129"
              target="_blank">
              this tweet
            </a>
            .
          </p>
        </label>
      </label>
    </>
  );
};

export default Instructions;
