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
              <div className="notice"><span className="icon icon-keyboard"></span><span>LATEST POST</span></div>
              <div className="post">
                <h1>{post.title}</h1>
                <h2>{post.date}</h2>
                <p>{post.preview}</p>
                <Link to="post" className="follow" params={{postId : post.key}}>... see more</Link>
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
      ga('send', 'pageview', '/');
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
      var reversedPosts = [];
      var len = posts.length;
      for (var i = (len - 1); i >= 0; i--) {
        reversedPosts.push(posts[i]);
      }
      return (
        <div>
          <article className="segment">
            <section className="intro first-section">
              {reversedPosts.map(function(post, i) {
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
      ga('send', 'pageview', '/write');
    }
  });

  var Shoot = React.createClass({
    mixins: [AnimationController],
    render: function () {
      var bg0 = {backgroundImage : "url(https://cdn-images-2.medium.com/max/2000/1*qyChxO31fdd7ho24BiIJrQ.jpeg)"};
      var bg1 = {backgroundImage : "url(https://d262ilb51hltx0.cloudfront.net/max/2000/1*SGUwe9_7yIPNpXNIK_sYrA.jpeg)"};
      var bg2 = {backgroundImage : "url(https://d262ilb51hltx0.cloudfront.net/max/2000/1*DyHoQrxW205LoSB5W2wXZw.jpeg)"};
      var bg3 = {backgroundImage : "url(https://d262ilb51hltx0.cloudfront.net/max/2000/1*qlqRV-7FysTjcre-wapcSw.jpeg)"}
      return (
        <div>
          <article className="segment greet-page">
            <section className="first-section">
              <h1>Shooting the World</h1>
              <p>
                I got into the world of photography in 2007 with a point-and-shoot. I don't really remember why I chose this expensive hobby, but I never looked back. Just one year later, I retired my point-and-shoot due to my desire for better image quality. Now I shoot with a Pentax K5IIs and a Sony RX1. My goal is to capture the world around me somewhat "faithfully". My specialties are landscapes and macros. Without further ado, these are my photos.
                <br /><br />
                <a className="photo-title" href="https://medium.com/@kzmeyao/grizzly-lake-trinity-alps-9a0e6fb13c32" target="_blank" style={bg0}></a>
                <small>Grizzly Lake, Trinity Alps &mdash; July 2015</small>
                <br /><br />
                <a className="photo-title" href="https://medium.com/@kzmeyao/amer-fort-6feea9e76462" target="_blank" style={bg1}></a>
                <small>Amer Fort &mdash; March 2015</small>
                <br /><br />
                <a className="photo-title" href="https://medium.com/@kzmeyao/costa-rica-pt-i-8a58d4f3f795" target="_blank" style={bg2}></a>
                <small>Costa Rica Pt. I &mdash; December 2014</small>
                <br /><br />
                <a className="photo-title" href="https://medium.com/@kzmeyao/costa-rica-pt-ii-8dbd6542e9fc" target="_blank" style={bg3}></a>
                <small>Costa Rica Pt. II &mdash; December 2014</small>
                <br /><br />
                Want to see more? Check out my <a href="https://500px.com/kzmeyao" target="_blank">500px</a> portfolio.
              </p>
            </section>
          </article>
        </div>
      )
    },
    componentDidMount: function () {
      this.assignNewState('shoot');
      ga('send', 'pageview', '/shoot');
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
              <p>I'm Kevin Z. Yao, and The Jelly Tank is my creative space. My job description states that I'm something along the lines of an engineer, but that does not paint the full picture. I like to think that I'm also an all-around creative person. Whether it's through photography, design, coding experiments, or writing, I'm constantly looking for new ways to stretch my artistic side. I have been inspired by many things in life, this is my way of giving back. Hopefully, there is something here that will inspire you. If not, try the links below.</p>
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
      ga('send', 'pageview', '/greet');
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
    },
    componentDidMount: function () {
      ga('send', 'pageview', '/write/' + this.getParams().postId);
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

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById("app"));
  });

})();