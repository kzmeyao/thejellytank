(function () {
  var Router = ReactRouter, DefaultRoute = Router.DefaultRoute, Link = Router.Link, Route = Router.Route, RouteHandler = Router.RouteHandler;

  var App = React.createClass({
    mixins: [{
      insertLogo: function () {
        var e = this.refs.logo.getDOMNode();
        e.innerHTML = '<svg height="40" width="40"><circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.25)" /><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="jelly" x="10" y="10" width="20" height="20" viewBox="0 0 8 8" enable-background="new 0 0 8 8" fill="#FFFFFF" xml:space="preserve"><path d="M4 0.2c-1.9 0-3.5 1.5-3.5 3.4 0 1.9 3.5 1.7 3.5 1.7s3.5 0.2 3.5-1.7C7.5 1.7 5.9 0.2 4 0.2z"/><g class="tentacles"><rect x="3.7" y="4.9" width="0.6" height="2.7"/><rect x="5.4" y="4.8" width="0.6" height="2.3"/><rect x="2.1" y="4.8" width="0.6" height="2.3"/></g></svg></svg>';
      }
    }],
    render: function () {
      return (
        <div>
          <nav id="js-bloom">
            <div className="nav-overlay">
              <div className="nav-wrapper">
                <Link to="/" className="nav-logo" ref="logo"></Link>
                <h2>
                  <span className="nav-gradient">THEJELLYTANK</span>
                </h2>
                <h3 className="thin">
                  <Link to="write">write</Link> x <Link to="shoot">shoot</Link> x <Link to="greet">greet</Link>
                </h3>
              </div>
            </div>
          </nav>

          <RouteHandler/>
        </div>
      );
    },
    componentDidMount: function () {
      this.insertLogo();
    }
  });

  var Home = React.createClass({
    render: function () {
      var text = "... wait. You came for the jellies, didn't you?";
      var buttonText = "Guity as Charged";
      return (
        <article className="segment">
          <section className="intro">
            <h1>I'm Kevin Z. Yao and I'm a creative</h1>
            <div className="thin">{text}</div>
            <button>{buttonText}</button>
          </section>
        </article>
      );
    }
  });

  var Shoot = React.createClass({
    render: function () {
      return (
        <div></div>
      )
    }
  });

  var Write = React.createClass({
    render: function () {
      return (
        <div></div>
      )
    }
  });

  var Greet = React.createClass({
    render: function () {
      return (
        <div></div>
      )
    }
  });

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="shoot" handler={Shoot}/>
      <Route name="write" handler={Write}/>
      <Route name="greet" handler={Greet}/>
      <DefaultRoute handler={Home}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById("app"));
  });

})();
//new Bloom("jelly-hidden", "js-bloom", "#ffffff", 1200, 1000);
//var App = new AppRouter();
//Backbone.history.start();