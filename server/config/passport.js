import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "./config.js";

passport.use(
  new Strategy(
    {
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
