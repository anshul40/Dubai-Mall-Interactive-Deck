import { Route, Router } from "@solidjs/router";
import Deck from "~/app/Deck";
import EventsModule from "~/modules/EventsModule";

export default function App() {
  return (
    <Router>
      <Route path="/events" component={EventsModule} />
      <Route path="/" component={Deck} />
    </Router>
  );
}
