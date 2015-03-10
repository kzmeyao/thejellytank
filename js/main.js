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
      var icon = document.getElementsByClassName("nav-" + to)[0];
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

  var App = React.createClass({
    mixins: [AnimationController],
    render: function () {
      return (
        <div id="js-particles">
          <nav id="js-bloom">
            <div className="nav-overlay">
              <div className="nav-mobile">
                <div className="nav-wrapper">
                  <Link to="/" className="nav-logo" ref="logoMobile"></Link>
                  <div className="icon"><Link to="write" className="nav-write icon-keyboard"></Link></div>
                  <div className="icon"><Link to="shoot" className="nav-shoot icon-camera"></Link></div>
                  <div className="icon"><Link to="greet" className="nav-greet icon-profile"></Link></div>
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
      if (active != null && active[0] != null) {
        var activeIcon = active[0].getAttribute("class");
        var match = /^nav-(.*) .*/.exec(activeIcon);
        if (match != null && match[1] !== "logo") {
          var that = this;
          setTimeout(function(){that.assignNewState(match[1]);}, 1000);
        }
      }
      document.getElementsByTagName("nav")[0].style.height = window.innerHeight + 60 + "px";
      window.onresize = function () {
        document.getElementsByTagName("nav")[0].style.height = window.innerHeight + 60 + "px";
      };
      var particles = new Particles("nav");
      for (var i = 0; i < 75; i++) {
        var particle = document.createElement('div');
        particle.setAttribute("id", "particle" + i);
        particle.setAttribute("class", "particle");
        particle.innerHTML = ".";
        particles.spawn(document.getElementById("js-particles").appendChild(particle));
      }
    }
  });

  var HomeState = function () {
    this.isOn = false;
    this.isJelly = false;
    this.bloom = null;
  };

  var homeState = new HomeState();

  var bloom;
  var Home = React.createClass({
    mixins: [AnimationController],
    render: function () {
      var text = "... wait. You came for the jellies, didn't you?"; //only because intellij complains
      var button;
      if (homeState.isOn) {
        button = <button onClick={this.stop}>Not really</button>;
      } else {
        button = <button onClick={this.start}>Guilty as charged</button>;
      }
      var post = posts[posts.length - 1];
      return (
        <div>
          <article className="segment">
            <section className="intro first-section">
              <h1>I'm Kevin Z. Yao and I'm a creative</h1>
              <div className="thin sub-intro">{text}</div>
              {button}
            </section>
          </article>
          <article className="segment">
            <section>
              <div className="notice"><span className="icon icon-keyboard"></span><span>LATEST POSTS</span></div>
              <div className="post" dangerouslySetInnerHTML={{__html: post.body}}>
              </div>
            </section>
          </article>
        </div>
      );
    },
    componentDidMount: function () {
      if (!homeState.isJelly) {
        homeState.bloom = new Bloom("jelly-hidden", "js-bloom", "#ffffff", 1200, 1000);
        homeState.isJelly = true;
      }
      this.restoreState();
    },
    start: function () {
      homeState.isOn = true;
      homeState.bloom.start();
      this.forceUpdate();
    },
    stop: function () {
      homeState.isOn = false;
      homeState.bloom.stop();
      this.forceUpdate();
    }
  });

  var Write = React.createClass({
    mixins: [AnimationController],
    render: function () {
      return (
        <div>
          <article className="segment">
            <section className="intro first-section">
              {posts.reverse().map(function(post, i) {
                var dateAndTags = (post.date + " [" + post.tags + "]").toUpperCase();
                var title = post.title;
                return <Link to="post" className="post" params={{postId : post.key}}><h2>{dateAndTags}</h2><h1>{title}</h1></Link>
              })}
            </section>
          </article>
        </div>
      )
    },
    componentDidMount: function () {
      this.assignNewState('write');
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
      this.assignNewState('shoot');
    }
  });

  var Greet = React.createClass({
    mixins: [AnimationController],
    render: function () {
      var headerOne = "hello.";
      var headerTwo = "what's with the jellies?";
      return (
        <div>
          <article className="segment greet-page">
            <section className="first-section">
              <h1>{headerOne}</h1>
              <p>I'm Kevin Z. Yao, and The Jelly Tank is my creative space for displaying what I do outside of work. I'm a developer who hacks at the frontend, backend, and everything in between. However, I am also an all-around creative person. Whether it's through photography, design, coding projects, or writing, I am constantly looking for new ways to stretch my artistic side. I have been inspired by many things in life, this is my way of giving back. Hopefully, there is something here that will inspire you.</p>
              <h1>{headerTwo}</h1>
              <p>"What we see before us is just one tiny part of the world. We get in the habit of thinking, This is the world, but that's not true at all. The real world is a much darker and deeper place than this, and much of it is occupied by jellyfish and things."
              <br /><br />
              - Haruki Murakami, <em>The Windup Bird Chronicles</em>
              </p>
              <br />
              <ul>
                <li>
                  <a href="mailto:kzmeyao@gmail.com" target="_blank" className="icon-envelope"></a>
                </li>
                <li>
                  <a href="https://github.com/kzmeyao" target="_blank" className="icon-github"></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/kzmeyao/" target="_blank" className="icon-linkedin"></a>
                </li>
                <li>
                  <a href="http://instagram.com/kzmeyao" target="_blank" className="icon-instagram"></a>
                </li>
                <li>
                  <a href="http://500px.com/kzmeyao" target="_blank" className="icon-px"></a>
                </li>
                <li>
                  <a href="https://gimmebar.com/loves/kzmeyao" target="_blank" className="icon-plus"></a>
                </li>
                <li>
                  <a href="https://twitter.com/kzmeyao" target="_blank" className="icon-twitter"></a>
                </li>
              </ul>
            </section>
          </article>
        </div>
      )
    },
    componentDidMount: function () {
      this.assignNewState('greet');
    }
  });

  var Post = React.createClass({
    mixins: [Router.State],
    render: function () {
      return (
        <div>
          <article className="segment">
            <section className="intro first-section">
              <div className="post" dangerouslySetInnerHTML={{__html: Posts[this.getParams().postId].body}} />
            </section>
          </article>
        </div>
      )
    }
  });

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="shoot" handler={Shoot}/>
      <Route name="write" handler={Write}/>
      <Route name="post" path="/write/:postId" handler={Post} />
      <Route name="greet" handler={Greet}/>
      <DefaultRoute handler={Home}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById("app"));
  });

})();