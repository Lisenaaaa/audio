# polybar-audio

Hi everyone! I made this for the sole reason that I was bored, and with the intent to have it support VLC, Spotify, and Firefox (playback such as YouTube, Disney+, etc) in one Polybar module. I'm a fucking idiot, and don't know how to do that, so now it's two (will be three once i get it working with firefox, probably).

Here are my Polybar configs for these scripts. Make sure to replace all the filepaths with the correct one for wherever you cloned this repo.
```ini
[module/spotify]
type = custom/script
interval = 1
format-prefix = "♫ "
format = <label>
exec = node ~/dotfiles/polybar/scripts/polybar-audio/spotify.js getcurrent
format-underline = #1db954
click-left = node ~/dotfiles/polybar/scripts/polybar-audio/spotify.js playpause 
click-right = node ~/dotfiles/polybar/scripts/polybar-audio/spotify.js next 
click-middle = node ~/dotfiles/polybar/scripts/polybar-audio/spotify.js previous 
```

​


# DEPENDENCIES

honestly i'm not sure, you can probably just run `npm i` and it'll work but i did use a different package a while ago that was yelling at me about deprecation stuff that required some other things to work so i honestly have no idea if it needs those or not, someone test it please and tell me