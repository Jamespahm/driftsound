// ✅ File: data/playlists.js
import studying from "/icons/studying.svg";
import coffee from "/icons/coffee-place.svg";
import sleep from "/icons/sleep.svg";
import noise from "/icons/noiseb.svg";
import ocean from "/icons/ocean-place.svg";

const playlists = [
    {
        name: "Studying",
        icon: studying,
        sounds: ["rain", "campfire", "forest"] // các ID từ data/sounds.jsx
    },
    {
        name: "Relax",
        icon: coffee,
        sounds: ["waves", "river", "wind"]
    },
    {
        name: "Sleep",
        icon: sleep,
        sounds: ["rain-on-tent", "thunder", "waterfall"]
    },
    {
        name: "Noise Blocker",
        icon: noise,
        sounds: ["bubbles", "train"]
    },
    {
        name: "Motivation",
        icon: ocean,
        sounds: ["waves", "birds", "wind"]
    },
    {
        name: "Thinking",
        icon: ocean,
        sounds: ["waves", "birds", "wind"]
    },

];

export default playlists;
