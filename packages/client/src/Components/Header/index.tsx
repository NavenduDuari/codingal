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

      if (this.state.countDownTime === 0) {
        this.clearCountDownTimer();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.clearCountDownTimer();
  }

  clearCountDownTimer = () => {
    if (this.counterId) {
      clearInterval(this.counterId);
      this.counterId = null;
    }
  };

  onToggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  getClassStatus = () => (
    <div className="menu-item w-full max-h-full flex items-center px-5 text-xs md:text-base">
      <div className="md:px-10 font-bold md:text-lg">
        Trial Lession [Grade 1-3]
      </div>
      <div className="ml-auto px-5">
        {`${formatTime(Math.trunc(this.state.countDownTime / 60))} :
        ${formatTime(this.state.countDownTime % 60)}`}
      </div>
      {this.counterId && (
        <button
          className={`
          end-btn bg-orange text-white 
          lg:inline-flex lg:w-auto 
          px-3 py-2 focus:outline-none
          rounded items-center justify-center
          `}
          type="button"
          onClick={() => this.setState({ showEndClassModal: true })}
        >
          End class
        </button>
      )}
    </div>
  );

  isEndReasonChecked = (reason: ClassEndReason) =>
    this.state.classEndReason === reason;

  isAbortReasonChecked = (reason: ClassAbortReason) =>
    this.state.classAbortReason === reason;

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
              this.state.isMenuOpen ? 'max-h-80' : 'max-h-0'
            } w-full flex items-center overflow-hidden 
            mt-5 lg:hidden transition-all duration-300 ease-in-out
          `}
        >
          {this.getClassStatus()}
        </div>

        {this.state.showEndClassModal && (
          <div className="end-class-modal-mask inset-0 absolute flex items-center justify-center">
            <div className="modal text-xs md:text-base w-6/7 md:w-1/2 flex flex-col p-3 rounded">
              <div
                className="modal-close-btn ml-auto text-gray-500"
                onClick={this.closeClassEndModal}
              >
                <CrossIcon />
              </div>
              <div className="heading text-base md:text-xl font-black px-4">
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
                    checked={this.isEndReasonChecked(ClassEndReason.Completed)}
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
                    checked={this.isEndReasonChecked(ClassEndReason.Aborted)}
                    readOnly
                  />
                  <span className="ml-3">Class aborted</span>
                </div>
                <div
                  className={`
                    sub-reasons ${
                      this.state.classEndReason === ClassEndReason.Aborted
                        ? 'max-h-80'
                        : 'max-h-0'
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
                      checked={this.isAbortReasonChecked(ClassAbortReason.R1)}
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
                      checked={this.isAbortReasonChecked(ClassAbortReason.R2)}
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
                      checked={this.isAbortReasonChecked(ClassAbortReason.R3)}
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
                      checked={this.isAbortReasonChecked(ClassAbortReason.R4)}
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
                      checked={this.isAbortReasonChecked(ClassAbortReason.R5)}
                      readOnly
                    />
                    <span className="ml-3">Other reason</span>
                  </div>
                  <div
                    className={`mt-3 ${
                      this.isAbortReasonChecked(ClassAbortReason.R5)
                        ? 'h-20'
                        : 'h-0'
                    } transition-all duration-500 ease-in-out overflow-hidden`}
                  >
                    <textarea
                      className="other-reason h-full w-full rounded border border-gray-300"
                      placeholder="Type here"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className={`
                      end-btn bg-orange text-white lg:inline-flex 
                      lg:w-auto px-3 py-2 rounded items-center 
                      justify-center focus:outline-none
                    `}
                    type="button"
                    onClick={(e: React.MouseEvent) => {
                      this.clearCountDownTimer();
                      this.closeClassEndModal(e);
                    }}
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
        )}
      </>
    );
  }
}

export default Header;
