<template>
  <div class="dropdown">
    <input type="checkbox" class="dropdown__switch" id="filter-switch" hidden />
    <label for="filter-switch" class="dropdown__options-filter">
      <ul class="dropdown__filter" role="listbox" tabindex="-1">
        <li class="dropdown__filter-selected" aria-selected="true">
          Please choose your payment method
        </li>
        <li>
          <ul class="dropdown__select">
            <li
              class="dropdown__select-option"
              v-for="item in options"
              :key="item"
              :value="item"
              role="option"
              @click="selectCard(item)"
            >
              <img
                :src="
                  '/svg/' + item.name.toString().toLowerCase() + '_icon.svg'
                "
                alt="dropdown flag icon"
              />
              <div class="card-numbers">
                <span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </label>

    <nuxt-img loading="lazy" class="drop_down" src="/svg/drop_down.svg" alt="dropdown icon" />
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  width: 80%;
  height: 100%;
}

.dropdown img.drop_down {
  position: absolute;
  right: 15px;
  top: 0;
  bottom: 10px;
  width: 21px;
  margin: auto;
}

img {
  width: 20px !important;
}

.dropdown__switch:checked + .dropdown__options-filter .dropdown__select {
  transform: scaleY(1);
}

.dropdown__switch:checked + .dropdown__options-filter .dropdown__filter:after {
  transform: rotate(-135deg);
}

.dropdown__options-filter {
  width: 100%;
  cursor: pointer;
  direction: ltr;
  text-align: center;
}

.dropdown__filter {
  position: relative;
  display: flex;
  padding: 15px;
  font-weight: 600;
  text-transform: capitalize;
  transition: 0.3s;
  align-items: center;
  width: 100%;
  height: 58px;
  border-radius: 6px;
  font-size: 14px;
  padding: 0 25px;
  border: 2px solid #d8d8d8;
  background: transparent;
  color: #000000;
  outline: none;
  text-align: left;
}

.dropdown__filter:focus {
  outline: none;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
}

.dropdown__filter::after {
  position: absolute;
  top: 45%;
  left: 30px;
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--text-primary-color);
  border-bottom: 2px solid var(--text-primary-color);
  transform: rotate(45deg) translateX(-45%);
  transition: 0.2s ease-in-out;
}

.dropdown__select {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  overflow: hidden;
  box-shadow: 0 5px 10px 0 rgba(152, 152, 152, 0.6);
  transform: scaleY(0);
  transform-origin: top;
  transition: 0.2s ease-in-out;
  font-weight: 600;
  z-index: 99999999;
  background: white;
}

.dropdown__select-option {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 5px;
  background-color: var(--background-text-info);
  border-bottom: 1px solid #d6d6d6;
  transition: 0.3s;
}

.dropdown__select-option:last-of-type {
  border-bottom: 0;
}

.dropdown__select-option:hover {
  background-color: var(--background-color-dark-gray);
}

.dropdown__select-option .card-numbers {
  display: flex;
  flex-direction: column;
}

.dropdown__select-option .card-numbers span:last-of-type {
  color: black;
  font-weight: 700;
  letter-spacing: 0.4px;
}

ul li {
  list-style: none;
  margin-bottom: 0 !important;
}

@media (max-width: 990px) {
  .dropdown {
    width: 100%;
  }

  .dropdown__filter {
    height: 41px;
  }

  .dropdown__select-option {
    padding: 10px 5px !important;
  }

  .dropdown__filter-selected {
    font-size: 12px !important;
  }
}

ol,
ul,
dl {
  margin-bottom: 0;
}
</style>

<style>

</style>

<script>
export default {
  props: {
    options: Array,
  },

  mounted() {
    const label = document.querySelector(".dropdown__filter-selected");
    const options = Array.from(
      document.querySelectorAll(".dropdown__select-option")
    );
    // document.addEventListener("click", (e) => {
    //   const toggle = document.querySelector(".dropdown__switch");
    //   const element = e.target;
    //   if (toggle == null) return;
    //   if (element == toggle) return;
    //
    //   const isDropdownChild = element.closest(".dropdown__filter");
    //
    //   if (!isDropdownChild) {
    //     toggle.checked = false;
    //   }
    // });
  },

  methods: {
    imgUrl(image) {
      return new URL(image, import.meta.url).href;
    },

    selectCard: function (card) {
      const label = document.querySelector(".dropdown__filter-selected");
      label.innerHTML =
        `<div style="display: flex; align-items: center; gap: 12px; font-weight: 700;"> <img
                                src="
                                    /svg/${card.name.toLowerCase()}_icon.svg"/>` +
        card.name;
      `</div>`;
      this.$emit("selected", card);
    },
  },
};


</script>
