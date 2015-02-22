(function () {
  var Router = ReactRouter,
      DefaultRoute = Router.DefaultRoute,
      Link = Router.Link,
      Route = Router.Route,
      RouteHandler = Router.RouteHandler;

  var AnimationController = {
    insertLogo: function () {
      var desktopNode = this.refs.logoDesktop.getDOMNode();
      var mobileNode = this.refs.logoMobile.getDOMNode();
      desktopNode.innerHTML = '<svg height="40" width="40"><circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.25)" /><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="jelly" x="10" y="10" width="20" height="20" viewBox="0 0 8 8" enable-background="new 0 0 8 8" fill="#FFFFFF" xml:space="preserve"><path d="M4 0.2c-1.9 0-3.5 1.5-3.5 3.4 0 1.9 3.5 1.7 3.5 1.7s3.5 0.2 3.5-1.7C7.5 1.7 5.9 0.2 4 0.2z"/><g class="tentacles"><rect x="3.7" y="4.9" width="0.6" height="2.7"/><rect x="5.4" y="4.8" width="0.6" height="2.3"/><rect x="2.1" y="4.8" width="0.6" height="2.3"/></g></svg></svg>';
      mobileNode.innerHTML = '<svg height="40" width="40"><circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.25)" /><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="jelly" x="10" y="10" width="20" height="20" viewBox="0 0 8 8" enable-background="new 0 0 8 8" fill="#FFFFFF" xml:space="preserve"><path d="M4 0.2c-1.9 0-3.5 1.5-3.5 3.4 0 1.9 3.5 1.7 3.5 1.7s3.5 0.2 3.5-1.7C7.5 1.7 5.9 0.2 4 0.2z"/><g class="tentacles"><rect x="3.7" y="4.9" width="0.6" height="2.7"/><rect x="5.4" y="4.8" width="0.6" height="2.3"/><rect x="2.1" y="4.8" width="0.6" height="2.3"/></g></svg></svg><div id="nav-active"><svg height="40" width="40"><circle cx="20" cy="20" r="20" fill="#569ea0" /></svg></div>';
    },
    assignNewState: function (to) {
      var icon = document.getElementsByClassName("icon-" + to)[0];
      var active = document.getElementById("nav-active");
      if (active != null) {
        var dist = active.offsetTop - icon.offsetTop + 22;
        TweenMax.to(active, .3, {autoAlpha: .5, display: 'block'});
        TweenMax.to(active, .3, {y : -dist});
      }
    },
    restoreState: function () {
      var icon = document.getElementsByClassName("nav-logo")[0];
      var active = document.getElementById("nav-active");
      if (active != null) {
        var dist = active.offsetTop - icon.offsetTop + 22;
        TweenMax.to(active, .3, {autoAlpha: 0, display: 'none'});
        TweenMax.to(active, .3, {y : dist});
      }
    }
  };

  //TODO: MAKE ONE NAV, ONE BACKGROUND
  var App = React.createClass({
    mixins: [AnimationController],
    render: function () {
      return (
        <div>
          <nav id="js-bloom">
            <div className="nav-overlay">
              <div className="nav-mobile">
                <div className="nav-wrapper">
                  <Link to="/" className="nav-logo" ref="logoMobile"></Link>
                  <div className="icon"><Link to="write" className="icon-keyboard"></Link></div>
                  <div className="icon"><Link to="shoot" className="icon-camera"></Link></div>
                  <div className="icon"><Link to="greet" className="icon-profile"></Link></div>
                </div>
              </div>
              <div className="nav-desktop">
                <div className="nav-wrapper">
                  <Link to="/" className="nav-logo" ref="logoDesktop"></Link>
                  <h2><span className="nav-gradient">THEJELLYTANK</span></h2>
                  <h3 className="thin">
                    <Link to="write">write</Link> x <Link to="shoot">shoot</Link> x <Link to="greet">greet</Link>
                  </h3>
                </div>
              </div>
            </div>
          </nav>

          <RouteHandler/>
        </div>
      );
    },
    componentDidMount: function () {
      this.insertLogo();
      var active = document.getElementsByClassName("active");
      if (active != null) {
        var activeIcon = active[0].getAttribute("class");
        var match = /^icon-(.*) .*/.exec(activeIcon);
        if (match != null) {
          var that = this;
          setTimeout(function(){that.assignNewState(match[1]);}, 1000);
        }
      }
    }
  });

  var Home = React.createClass({
    mixins: [AnimationController],
    getInitialState: function () {
      return {
        isOn: false
      };
    },
    render: function () {
      var text = "... wait. You came for the jellies, didn't you?"; //only because intellij complains
      var button;
      if (this.state.isOn) {
        button = <button onClick={this.stop}>Nevermind</button>;
      } else {
        button = <button onClick={this.start}>Guilty as charged</button>;
      }
      return (
        <div>
          <article className="segment">
            <section className="intro">
              <h1>I'm Kevin Z. Yao and I'm a creative</h1>
              <div className="thin">{text}</div>
              {button}
            </section>
          </article>
          <article className="segment"></article>
        </div>
      );
    },
    componentDidMount: function () {
      this.bloom = new Bloom("jelly-hidden", "js-bloom", "#ffffff", 1200, 1000);
      this.restoreState();
    },
    start: function () {
      var that = this;
      this.setState({isOn : true}, function () {that.bloom.start()});
    },
    stop: function () {
      var that = this;
      this.setState({isOn : false}, function () {that.bloom.stop()});
    }
  });

  var Write = React.createClass({
    mixins: [AnimationController],
    render: function () {
      return (
        <div></div>
      )
    },
    componentDidMount: function () {
      this.assignNewState('keyboard');
    }
  });

  var Shoot = React.createClass({
    mixins: [AnimationController],
    render: function () {
      return (
        <div></div>
      )
    },
    componentDidMount: function () {
      this.assignNewState('camera');
    }
  });

  var Greet = React.createClass({
    mixins: [AnimationController],
    render: function () {
      return (
        <div></div>
      )
    },
    componentDidMount: function () {
      this.assignNewState('profile');
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