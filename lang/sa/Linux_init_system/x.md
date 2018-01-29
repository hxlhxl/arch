# Term
- Window System
  a software component that provides windows for applications to draw in and can display these windows in the screen
  eg. X window system(Wayland/Mir)
  X window is C/S arch
- Display Manager
  responsible for providing a login interface
  takes care of starting an X server which serves both the login prompt and the subsequent user session.

- Window Manager
  an X client with a special role. It receives notifications when new windows are created and typically traps a number of user events (key and mouse bindings). Its job is to choose where to display windows and at what size, to show and hide windows, to display window decorations (borders, title bar, …), etc. Pretty much every window manager can serve as a session manager — the window manager has to run for the whole session anyway. Most window managers offer a way for users to start new programs via menus or key bindings, though strictly speaking this isn't part of the window manager role.

- Session Manager
  to start other programs. It's the first program started as part of a user's interactive session. It can be started by the display manager (after it has dropped privileges). It can also be started by some program running as the user if the user has logged in by some means other than a display manager, typically with a text mode login prompt; this is usually done via the startx script which takes care of starting an X server, running the session manager, and killing the X server when done. The session manager can be anything from a simple terminal emulator in which the user can type commands, to a script that starts several predefined programs, to a sophisticated program that remembers applications and window positions from one session to the next. The session ends when the session manager exits.

- Desktop Enviroment(de)
  a collection of X clients that comprises at least a session manager, a window manager and a graphical shell, as well as a collection of utilities such as menus, docks, clipboard manager, macro facility, etc.



# ~/.xinitrc
The ~/.xinitrc file is a shell script read by xinit and by its front-end startx. It is mainly used to execute desktop environments, window managers and other programs when starting the X server (e.g., starting daemons and setting environment variables). The xinit program starts the X Window System server and works as first client program on systems that are not using a display manager.



One of the main functions of ~/.xinitrc is to dictate which client for the X Window System is invoked with startx or xinit programs on a per-user basis. There exists numerous additional specifications and commands that may also be added to ~/.xinitrc as you further customize your system.


