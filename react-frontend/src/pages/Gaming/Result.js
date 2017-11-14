import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Result extends Component {
  handleShare() {
    alert("已将分享链接复制到剪切板");
  }

  render() {
    return (
      <div className="modal" id="resultModal" tabIndex="-1" role="dialog" aria-labelledby="resultModalLabel">
        <div className="modal-dialog">
          <div className="form-box">

            <div className="modal-body">
              <div className="modal-content">

                <div className="form-top">

                  <div className="form-top-left">
                    {this.props.score > 0 ?
                    <h3>恭喜过关！ </h3>
                    :<h3>再接再厉！</h3>}
                  </div>
                </div>
                <div className="form-bottom">
                  <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      {this.props.score > 0 ?
                        <img src="/img/star.png" className="img-responsive" alt="Responsive image" />
                        : <img src="/img/nostar.png" className="img-responsive" alt="Responsive image" />}
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      {this.props.score > 0 ?
                        <img src="/img/star.png" className="img-responsive" alt="Responsive image" />
                        : <img src="/img/nostar.png" className="img-responsive" alt="Responsive image" />}
                    </div><div className="col-md-4 col-sm-4 col-xs-4">
                      {this.props.score > 0 ?
                        <img src="/img/star.png" className="img-responsive" alt="Responsive image" />
                        : <img src="/img/nostar.png" className="img-responsive" alt="Responsive image" />}
                    </div>
                  </div>
                  {this.props.score > 0 ?
                  <div className="result-btn-group">
                    <div className="row">
                      <Link to={'/map/'+(parseInt(this.props.mapID)+1)} type="button" className="btn btn-success result-btn col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1" >下一关</Link>
                    </div>
                    <div className="row">
                      <CopyToClipboard text={window.location.host + "/share/"+this.props.mapID+"/"+this.props.shareUserID}>
                        <button type="button" className="btn btn-primary result-btn col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-1" onClick={this.handleShare.bind(this)}>分享</button>
                      </CopyToClipboard>

                      <button type="button" className="btn btn-default result-btn col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2 col-xs-4 col-xs-offset-2" data-dismiss="modal">返回</button>
                    </div>
                  </div>
                  :
                  <div className="row result-btn-group">
                    <button type="button" className="btn btn-default result-btn col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">返回</button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Result
