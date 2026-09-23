tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
        script: ["Dancing Script", "cursive"],
      },
      colors: {
        brand: {
          coral: "#E97A86",
          coralDark: "#D96C7D",
          blue: "#3F6FA8",
          blueDark: "#2F4E6B",
          pinkLight: "#F3C1C5",
          blueSoft: "#B9C6DC",
          blueLight: "#DCE6EA",
          cream: "#FFF8F3",
          offWhite: "#FCF4F1",
          pastelPink: "#FBE8E2",
          roseBeige: "#DAC6CB",
          textMain: "#304A62",
          textSec: "#5B4445",
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.08)",
        card: "0 8px 30px rgba(0,0,0,0.06)"
      }
    }
  }
}
