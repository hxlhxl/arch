ref: https://gist.github.com/tybenz/5620255

sudo pacman -S community/acpid
sudo systemctl start acpid.service


husa$ acpi_listen
button/mute MUTE 00000080 00000000 K



sudo pacman -S extra/alsa-utils
amixer scontrols

amixer sset Master unmute
