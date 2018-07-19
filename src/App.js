import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

function numeral(n) {
  n %= 10;
  return ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][n];
}

function renderCommentText(text) {
  const starts = text.split('[img]');
  const final = [starts[0]];
  for(let start of starts.slice(1)) {
    const ends = start.split('[/img]');
    if(ends.length > 1) {
      const url = ends[0];
      final.push(<div style={{
        marginLeft: '-32px',
        marginRight: '-32px',
        marginTop: '16px',
        marginBottom: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '16px',
      }}>
        <img src={url} alt=""  style={{margin:'0 auto',padding:0,display:'block', maxWidth: '180px', maxHeight: '320px'}}/>
      </div>);
      final.push(ends.slice(1).join(''));
    }
  }
  return <div>{final}</div>;
}

class App extends Component {
  componentWillMount() {
    const id = window.location.pathname.split('/').slice(-1)[0];
    fetch('https://cors-anywhere.herokuapp.com/http://api.pouet.net/v1/prod/?id=' + id).then(response => response.json()).then(data => {
      this.setState({
        prod: data.prod,
      });
    });
    fetch('https://cors-anywhere.herokuapp.com/http://api.pouet.net/v1/prod/comments/?id=' + id).then(response => response.json()).then(data => {
      this.setState({
        comments: data.prod.comments,
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const prod = this.state.prod;
    console.log(prod);
    console.log(this.state.comments);
    if(!this.state.prod) {
      return 'Loading';
    }
    return (
      <div className="App" style={{
      }}>
        <header className="App-header" style={{
            height: '200px',
            background: 'transparent url(http://content.pouet.net/logos/pouet_daxx2.gif) no-repeat center top',
        }}>

        <div style={{
          marginTop: '158px', 
          marginBottom: '12px',
        }}>
        logo done by <a href="#">d4XX</a> :: pouët.net is brought to you by <a href="#">mandarine</a>
        </div>
        <div style={{
          background: 'rgb(49, 90, 140)',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
          height: '32px',
          marginLeft: '-20px',
          marginRight: '-20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            flex: 1,
            fontSize: '14px',
            maxWidth: '740px',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            {['Account',
              'Prods',
              'Groups',
              'Parties',
              'Users',
              'Boards',
              'Lists',
              'Search',
              'BBS',
              'FAQ',
              'Submit'].map(nav => (
                <div style={{
                }}>
                  <span style={{
                    fontWeight: 900,
                    color: 'rgb(159, 207, 255)',
                  }}>{nav[0]}</span>
                  <span>{nav.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </header>
        <div style={{
          maxWidth: '740px',
          color: 'white',
          margin: '0 auto',
        }}>
          <div style={{
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: '16px',
            overflow: 'hidden',
            backgroundColor: '#446688',
            borderRadius: '2px',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.36)',
          }}>
            <div style={{
              padding: '0 0 52.25% 0',
              background: `black url(${prod.screenshot}) no-repeat center center/contain`,
            }}>
            </div>
            <div style={{
              padding: '16px',
              flexDirection: 'column',
              display: 'flex',
            }}>
            <h1 style={{
              marginTop: '8px', 
              marginBottom: '8px',
            }}>{prod.name}</h1>
            <div style={{
              marginBottom: '16px',  
            }}>{prod.groups[0].name}</div>
              {prod.party ?
                  <div style={{opacity: 0.5, height: '20px', paddingTop: '4px'}}>
                    <a href="#">{prod.party.name} {prod.party_year}</a>
                  </div>
                :
                <div style={{opacity: 0.5}}>Released on {prod.releaseDate}</div>
              }
              <div>
              </div>

              {prod.placings.map((placing, i) => (
                <div key={i} style={{opacity: 0.5, height: '24px'}}>
                  {placing.ranking}<sup>{numeral(placing.ranking)}</sup> place {placing.compo_name}
                </div>
              ))}

              <div style={{opacity: 0.5, height: '24px', marginTop: '2px'}}>
                <span>{prod.type}</span>
                {Object.keys(prod.platforms).map((key, i) => (
                  <span key={key}>
                    {' • '}
                    {prod.platforms[key].name}
                  </span>
                ))}
              </div>

              <div style={{
                flex: 1,
                marginTop: '24px',
                display: 'flex',
                flexDirection: 'row',
                fontSize: '26px',
                justifyContent: prod.awards && prod.awards.length ? 'space-between' : 'space-around',
              }}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <img src="http://content.pouet.net/gfx/sucks.gif" alt=""  style={{
                    width: '24px', 
                    height: '24px', 
                    marginTop: '2px',
                    marginRight: '8px',
                  }}/>
                  {prod.votedown} 
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <img src="http://content.pouet.net/gfx/isok.gif" alt=""  style={{
                    width: '24px', 
                    height: '24px', 
                    marginTop: '4px',
                    marginRight: '8px',
                  }}/>
                  {prod.votepig} 
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <img src="http://content.pouet.net/gfx/rulez.gif" alt=""  style={{
                    width: '24px', 
                    height: '24px', 
                    marginTop: '-1px',
                    marginRight: '8px',
                  }}/>
                  {prod.voteup} 
                </div>
                {prod.cdc > 0 &&
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src="http://content.pouet.net/gfx/titles/coupdecoeur.gif" alt=""  style={{
                      width: '24px', 
                      height: '24px', 
                      marginTop: '1px',
                      marginRight: '8px',
                    }}/>
                    {prod.cdc} 
                  </div>
                }
                {prod.awards && prod.awards.length > 0 &&
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {prod.awards.map((award, i) => (
                      <img key={i} src={{meteoriknominee: 'http://content.pouet.net/gfx/sceneorg/meteoriknominee.gif', awardnominee: 'http://content.pouet.net/gfx/sceneorg/awardnominee.gif', awardwinner: 'http://content.pouet.net/gfx/sceneorg/awardwinner.gif'}[award.type]} alt=""  style={{
                        width: '24px', 
                        height: '24px', 
                        marginTop: '1px',
                        marginRight: '8px',
                      }}/>
                    ))}
                  </div>
                }
              </div>
              </div>
          </div>

          <div style={{
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: '16px',
            overflow: 'hidden',
            backgroundColor: 'rgb(15, 31, 50)',
            borderRadius: '2px',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.36)',
          }}>
          <div style={{
            padding: '16px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}>
              <a href={prod.download} style={{
                color: 'white',  
                marginRight: '16px',
                textDecoration: 'none',
                borderBottom: '1px solid white',
                fontWeight: 'bold',
              }}>
                Download
              </a>
              {prod.downloadLinks.map((link, i) => (
                <span key={i}>
                  <span style={{opacity: 0.25}}>{' • '}</span>
                  <a href={link.link} style={{
                    color: 'white',
                    marginRight: '16px',
                    marginLeft: '16px',
                    fontWeight: 100,
                    textDecoration: 'none',
                  }}>
                    {link.type}
                  </a>
                </span>
              ))}
            </div>
          </div>
          <div style={{
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: '16px',
            overflow: 'hidden',
            backgroundColor: '#446688',
            borderRadius: '2px',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.36)',
          }}>
          <div style={{
            padding: '16px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '-16px',
          }}>
            {prod.credits && prod.credits.length > 0 && prod.credits.map((credit, i) => (
                  <a key={i} href="#" style={{
                    color: 'white',
                    marginRight: '16px',
                    marginLeft: '16px',
                    marginBottom: '16px',
                    width: '170px',
                    fontWeight: 100,
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '8px',
                    background: '#6688AA',
                  }}>
                  <img src={'http://content.pouet.net/avatars/' + credit.user.avatar}
                    alt=""
                    style={{
                    width: '16px',
                    height: '16px',
                  }} />
                  </div>
                  <div style={{
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                    <div>{credit.user.nickname}</div>
                    <div style={{opacity: 0.5, fontSize: '12px'}}>{credit.role}</div>
                  </div>
                  </a>
              ))}
            </div>
          </div>
          <div style={{
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: '16px',
            overflow: 'hidden',
            backgroundColor: '#446688',
            borderRadius: '2px',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.36)',
          }}>
          <div style={{
            padding: '16px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
              {['Edit', 'Add to watchlist'].map((text, i) => (
                <span key={i}>
                  <span style={{opacity: 0.25}}>{' • '}</span>
                  <a href="#" style={{
                    color: 'white',
                    marginRight: '16px',
                    marginLeft: '16px',
                    fontWeight: 100,
                    textDecoration: 'none',
                  }}>
                    {text}
                  </a>
                </span>
              ))}
            </div>
          </div>

<h2 style={{marginTop: '64px', fontWeight: 300}}>NFO</h2>

          <div style={{
            marginLeft: '16px',
            marginRight: '16px',
            marginTop: '16px',
            overflow: 'hidden',
            backgroundColor: 'rgb(49, 90, 140)',
            borderRadius: '2px',
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.36)',
            display: 'flex',
          }}>

              <div style={{
                fontFamily: 'Courier New, monospace',
                textShadow: '2px 2px 1px rgb(36, 70, 104)',
                fontSize: '12px',
                whiteSpace: 'pre',
                textAlign: 'left',
                letterSpacing: '-0.25px',
                margin: '32px auto',
                overflow: 'hidden',
                height: '64px',
              }}>

              {`•  Astral Blur
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬■ 
  From The Gathering '97
  by The Black Lotus
  3rd in the compo. CNCD and Rage kicked our ass, blame them.

•  credits
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬■ 
  Nix         Main gfx code, Design
  Azazel      Music, Design
  Jace        Additional gfx code
  Balance     System code, Music replay
  Danny       Graphics
  Lowlife     Graphics
•  credits
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬■ 
  Nix         Main gfx code, Design
  Azazel      Music, Design
  Jace        Additional gfx code
  Balance     System code, Music replay
  Danny       Graphics
  Lowlife     Graphics
•  credits
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬■ 
  Nix         Main gfx code, Design
  Azazel      Music, Design
  Jace        Additional gfx code
  Balance     System code, Music replay
  Danny       Graphics
  Lowlife     Graphics
•  credits
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬■ 
  Nix         Main gfx code, Design
  Azazel      Music, Design
  Jace        Additional gfx code
  Balance     System code, Music replay
  Danny       Graphics
  Lowlife     Graphics
•  credits
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬■ 
  Nix         Main gfx code, Design
  Azazel      Music, Design
  Jace        Additional gfx code
  Balance     System code, Music replay
  Danny       Graphics
  Lowlife     Graphics
  Louie       Graphics`}
              </div>
          </div>

<h2 style={{marginTop: '64px', fontWeight: 300}}>Comments</h2>

					{this.state.comments && this.state.comments.map(comment => (
						<div className="comment" style={{
							marginLeft: '16px',
							marginRight: '16px',
							marginTop: '16px',
							overflow: 'hidden',
              backgroundColor: prod.credits.filter(credit => credit.user.id === comment.user.id).length ? 'rgb(92, 82, 136)' : 'rgb(49, 90, 140)',
							borderRadius: '2px',
							boxShadow: '0 2px 2px rgba(0, 0, 0, 0.36)',
							display: 'flex',
              textAlign: 'left',
              lineHeight: '1.58rem',
              letterSpacing: '-0.003rem',
              display: 'flex',
              flexDirection: 'column',
						}}>
              <div style={{
                padding: '16px 24px 16px 16px',
              }}>
                {renderCommentText(comment.comment)}
              </div>
              <div style={{
                textAlign: 'right',
                background: 'rgba(255, 255, 255, 0.05)',
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '8px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#6688AA',
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '8px',
                }}>
                  <img
                    src={'http://content.pouet.net/avatars/' + comment.user.avatar}
                    alt=""
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                </div>
                <div style={{flex: 1, textAlign: 'left'}}>
                  {comment.user.nickname}
                </div>
                <div style={{opacity: 0.5, marginRight: '16px'}}>
                  {moment(comment.addedDate).fromNow()}
                </div>
                  <img src={`http://content.pouet.net/gfx/${{1: 'rulez', 0: 'isok', '-1': 'sucks'}[comment.rating]}.gif`}
                    alt=""
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '16px',
                    }}
                  />
              </div>
						</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
