import React, { Component } from 'react';
import './Header.scss';
import { MenuIcon, CrossIcon } from './icons';
import {
  ClassEndReason,
  ClassAbortReason,
  ComponentPropsI,
  ComponentStateI,
} from './types';

const formatTime = (time: number): string => `${time < 10 ? '0' : ''}${time}`;

class Header extends Component<ComponentPropsI, ComponentStateI> {
  counterId: NodeJS.Timeout | null;

  constructor(props: ComponentPropsI) {
    super(props);
    this.state = {
      countDownTime: 600,
      isMenuOpen: false,
      showEndClassModal: false,
      classEndReason: ClassEndReason.Completed,
      classAbortReason: ClassAbortReason.R5,
    };

    this.counterId = null;
  }

  componentDidMount() {
    this.counterId = setInterval(() => {
      this.setState((prevState) => ({
        countDownTime: prevState.countDownTime - 1,
      }));

      if (this.state.countDownTime === 0 && this.counterId) {
        clearTimeout(this.counterId);
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.counterId) {
      clearInterval(this.counterId);
    }
  }

  onToggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  getClassStatus = () => (
    <div className="menu-item w-full max-h-full flex items-center px-5">
      <div className="lg:px-10 font-bold text-lg">
        Trial Lession [Grade 1-3]
      </div>
      <div className="ml-auto px-10">
        {`${formatTime(Math.trunc(this.state.countDownTime / 60))} :
        ${formatTime(this.state.countDownTime % 60)}`}
      </div>
      <button
        className="bg-orange text-white lg:inline-flex lg:w-auto px-3 py-2 rounded items-center justify-center"
        type="button"
        onClick={() => this.setState({ showEndClassModal: true })}
      >
        End class
      </button>
    </div>
  );

  isChecked = (
    reasonType: 'end' | 'abort',
    reason: ClassEndReason | ClassAbortReason
  ) => {
    if (reasonType === 'end') {
      return this.state.classEndReason === reason;
    }
    if (reasonType === 'abort') {
      return this.state.classAbortReason === reason;
    }
    return false;
  };

  onEndReasonChange = (e: React.MouseEvent, reason: ClassEndReason): void => {
    e.stopPropagation();
    this.setState({ classEndReason: reason });
  };

  onAbortReasonChange = (
    e: React.MouseEvent,
    reason: ClassAbortReason
  ): void => {
    e.stopPropagation();
    this.setState({ classAbortReason: reason });
  };

  closeClassEndModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.setState({ showEndClassModal: false });
  };

  render() {
    return (
      <>
        <nav className="flex items-center p-3 flex-wrap h-16">
          <a className="ml-5 inline-flex items-center">
            <img
              src="https://cdn.codingal.com/images/logos/logos-main/favicon-90x90.png"
              className="h-8 cursor-pointer hidden lg:block"
            />
            <img
              src="https://cdn.codingal.com/images/logos/logos-main/logo-with-text.svg"
              className="h-8 cursor-pointer lg:hidden"
            />
          </a>
          <button
            className={`
              text-black 
              inline-flex p-3 rounded lg:hidden 
              ml-auto border-0 focus:outline-none 
              border-none nav-toggler
            `}
            data-target="#navigation"
            type="button"
            onClick={this.onToggleMenu}
          >
            {this.state.isMenuOpen ? <CrossIcon /> : <MenuIcon />}
          </button>
          <div
            className={`
              navbar-menu-items-horizontal hidden 
              lg:inline-flex lg:flex-grow lg:w-auto
            `}
          >
            {this.getClassStatus()}
          </div>
        </nav>

        <div
          className={`
            navbar-menu-items-vertical ${
              this.state.isMenuOpen ? 'max-h-full' : 'max-h-0'
            } w-full flex items-center overflow-hidden 
            mt-5 lg:hidden transition-all transform duration-300 ease-in-out
          `}
        >
          {this.getClassStatus()}
        </div>

        {this.state.showEndClassModal && (
          <div
            className="end-class-modal-mask inset-0 absolute flex items-center justify-center"
            onClick={this.closeClassEndModal}
          >
            <div className="modal w-4/5 md:w-1/2 flex flex-col p-3 rounded">
              <div
                className="modal-close-btn ml-auto text-gray-500"
                onClick={this.closeClassEndModal}
              >
                <CrossIcon />
              </div>
              <div className="heading text-xl font-black px-4">
                Select a reason to end class
              </div>
              <div className="reasons mt-2 flex flex-col p-3">
                <div
                  className="reason"
                  onClick={(e: React.MouseEvent) =>
                    this.onEndReasonChange(e, ClassEndReason.Completed)
                  }
                >
                  <input
                    type="radio"
                    checked={this.isChecked('end', ClassEndReason.Completed)}
                    readOnly
                  />
                  <span className="ml-3">Class completed</span>
                </div>
                <div
                  className="reason"
                  onClick={(e: React.MouseEvent) =>
                    this.onEndReasonChange(e, ClassEndReason.Aborted)
                  }
                >
                  <input
                    type="radio"
                    checked={this.isChecked('end', ClassEndReason.Aborted)}
                    readOnly
                  />
                  <span className="ml-3">Class aborted</span>
                </div>
                <div
                  className={`
                    sub-reasons ${
                      this.state.classEndReason === ClassEndReason.Aborted
                        ? 'max-h-80'
                        : 'max-h-0 h-auto'
                    } flex flex-col overflow-hidden ml-3 
                    transition-all duration-500 ease-in-out
                  `}
                >
                  <div
                    className="sub-reason"
                    onClick={(e: React.MouseEvent) =>
                      this.onAbortReasonChange(e, ClassAbortReason.R1)
                    }
                  >
                    <input
                      type="radio"
                      checked={this.isChecked('abort', ClassAbortReason.R1)}
                      readOnly
                    />
                    <span className="ml-3">
                      Student didn't show up for the class
                    </span>
                  </div>
                  <div
                    className="sub-reason"
                    onClick={(e: React.MouseEvent) =>
                      this.onAbortReasonChange(e, ClassAbortReason.R2)
                    }
                  >
                    <input
                      type="radio"
                      checked={this.isChecked('abort', ClassAbortReason.R2)}
                      readOnly
                    />
                    <span className="ml-3">
                      Student didn't show any interest
                    </span>
                  </div>
                  <div
                    className="sub-reason"
                    onClick={(e: React.MouseEvent) =>
                      this.onAbortReasonChange(e, ClassAbortReason.R3)
                    }
                  >
                    <input
                      type="radio"
                      checked={this.isChecked('abort', ClassAbortReason.R3)}
                      readOnly
                    />
                    <span className="ml-3">Student got disconnected</span>
                  </div>
                  <div
                    className="sub-reason"
                    onClick={(e: React.MouseEvent) =>
                      this.onAbortReasonChange(e, ClassAbortReason.R4)
                    }
                  >
                    <input
                      type="radio"
                      checked={this.isChecked('abort', ClassAbortReason.R4)}
                      readOnly
                    />
                    <span className="ml-3">I got disconnected</span>
                  </div>
                  <div
                    className="sub-reason"
                    onClick={(e: React.MouseEvent) =>
                      this.onAbortReasonChange(e, ClassAbortReason.R5)
                    }
                  >
                    <input
                      type="radio"
                      checked={this.isChecked('abort', ClassAbortReason.R5)}
                      readOnly
                    />
                    <span className="ml-3">Other reason</span>
                  </div>
                  <div
                    className={`my-3 ${
                      this.isChecked('abort', ClassAbortReason.R5)
                        ? 'h-20'
                        : 'h-0'
                    } transition-all duration-500 ease-in-out overflow-hidden`}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    <textarea
                      className="other-reason h-full w-full rounded border border-gray-300"
                      placeholder="Type here"
                    />
                  </div>
                  <div>
                    <button
                      className={`
                        bg-orange text-white lg:inline-flex 
                        lg:w-auto px-3 py-2 rounded items-center 
                        justify-center focus:outline-none
                      `}
                      type="button"
                      onClick={this.closeClassEndModal}
                    >
                      End class
                    </button>

                    <button
                      className={`
                        bg-white text-black px-3 
                        py-2 rounded items-center 
                        justify-center focus:outline-none
                      `}
                      type="button"
                      onClick={this.closeClassEndModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Header;
