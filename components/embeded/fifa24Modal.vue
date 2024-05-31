<template>
  <div class="containermodal" v-if="show" @click.self="onCloseModal">
    <div class="modal-support">
      <div>
        <p class="p1">{{ message.title }}</p>
        <p class="p2">{{ message.content }}</p>
        <p class="p3" v-html="message.footer"></p>
      </div>
    </div>
  </div>
</template>

<script>
import useUtils from "../../composables/useUtils";
import {getLocale} from "../../plugins/i18n";
export default {
  name: "fifa24Modal",
  props:{
      show:{
        default:false,
        type:Boolean
      }
  },
  setup(){
    const {getWGSupportMsg} = useUtils();
    const locale = getLocale()
    const messages = {
      en: {
        title: 'End of FIFA 23 Season',
        content: 'Hello, please note that the FUT 23 Web/- CompanionApp is no longer available. This officially ends the FIFA 23 Season and we at WhatsGaming will start preparing for the new FC 24 Season immediately. We will probably start selling FC 24 Coins at the end of this month, at the latest at the beginning of October.',
        footer: 'Best regards, <br>your WhatsGaming Team',
      },
      de: {
        title: 'Ende der FIFA 23 Season',
        content: 'Hallo, bitte beachtet, dass die FUT 23 Web/- CompanionApp nicht mehr verfügbar ist. Damit ist die FIFA 23 Season offiziell beendet und wir von WhatsGaming werden uns ab sofort auf die neue FC 24 Season vorbereiten. Wir werden wahrscheinlich Ende diesen Monats, spätestens Anfang Oktober mit dem Verkauf von FC 24 Coins beginnen.',
        footer: 'Besten Gruß, <br>euer WhatsGaming Team',
      },
      it: {
        title: 'Fine della stagione FIFA 23',
        content: 'Salve, vi informiamo che la Web/ CompanionApp di FUT 23 non è più disponibile. Questo chiude ufficialmente la stagione FIFA 23 e noi di WhatsGaming inizieremo a prepararci per la nuova stagione FC 24 immediatamente. Probabilmente inizieremo a vendere Monete FC 24 alla fine di questo mese, al massimo all\'inizio di ottobre.',
        footer: 'Cordiali saluti, <br>il vostro team WhatsGaming',
      },
      fr: {
        title: 'Fin de la saison FIFA 23',
        content: "Bonjour, veuillez noter que l'application compagnon FUT 23 Web/- n'est plus disponible. Ceci met officiellement fin à la saison FIFA 23 et nous, à WhatsGaming, commencerons immédiatement à préparer la nouvelle saison FC 24. Nous commencerons probablement à vendre des pièces FC 24 à la fin de ce mois, au plus tard au début du mois d'octobre.",
        footer: 'Meilleures salutations, <br>votre équipe WhatsGaming',
      },
      es: {
        title: 'Fin de la temporada de FIFA 23',
        content: 'Hola, os informamos de que la FUT 23 Web/- CompanionApp ya no está disponible. Esto pone fin oficialmente a la Temporada FIFA 23 y nosotros en WhatsGaming comenzaremos a prepararnos para la nueva Temporada FC 24 inmediatamente. Probablemente empezaremos a vender FC 24 Coins a finales de este mes, como muy tarde a principios de octubre.',
        footer: 'Saludos cordiales, <br>tu equipo de WhatsGaming',
      },
      tr: {
        title: 'FIFA 23 Sezonunun Sonu',
        content: "Merhaba, lütfen FUT 23 Web/- CompanionApp'in artık mevcut olmadığını unutmayın. Böylece FIFA 23 Sezonu resmen sona eriyor ve WhatsGaming olarak yeni FC 24 Sezonu için hazırlıklara hemen başlayacağız. FC 24 Paralarını muhtemelen bu ayın sonunda, en geç Ekim ayının başında satmaya başlayacağız.",
        footer: 'Saygılarımla, <br>NetsGaming Ekibiniz',
      },
      ar: {
        title: 'نهاية موسم فيفا 23',
        content: "مرحبًا، يرجى ملاحظة أن تطبيق FUT 23 Web/- CompanionApp لم يعد متاحًا. وبهذا ينتهي موسم FIFA 23 رسميًا وسنبدأ في WhatsGaming الاستعداد لموسم FC 24 الجديد على الفور. من المحتمل أن نبدأ في بيع عملات FC 24 في نهاية هذا الشهر، على أبعد تقدير في بداية شهر أكتوبر.",
        footer: 'مع أطيب التحيات، فريق WhatsGaming الخاص بك',
      },
      id: {
        title: 'Akhir Musim FIFA 23',
        content: 'Halo, mohon diperhatikan bahwa FUT 23 Web/- CompanionApp sudah tidak tersedia lagi. Hal ini secara resmi mengakhiri Musim FIFA 23 dan kami di WhatsGaming akan segera mempersiapkan Musim FC 24 yang baru. Kami mungkin akan mulai menjual Koin FC 24 pada akhir bulan ini, paling lambat awal Oktober.',
        footer: 'Salam hormat, <br>Tim WhatsGaming Anda',
      },
    }
    const message = messages[locale] || messages.en
    return {getWGSupportMsg, message}
  },
  methods:{
    onCloseModal(){
      this.$emit("close");
    }
  }
}
</script>

<style scoped>
.containermodal{
  width: 100%;
  height: 100vh;
  opacity: 1;
  background: #22222269;
  z-index: 40000;
  top:0;
  left: 0;
  overflow: hidden;
  animation-name: fadeIn_Container;
  animation-duration: 1s;
  display: block;
  position: fixed;
}
.modal-support{
  border-radius: 15px;
  animation-name: fadeIn_Modal;
  animation-duration: 0.8s;
  width: 450px;
  background-color: white;
  position: absolute;
  display: block;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  padding: 15px;
}
.modal-support > div{
  border: 2px solid #201D56;
  min-height: 220px;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding: 30px;
  text-align: center;
}
.p1{
  font-weight: bolder;
  font-size: 18px;
  margin:0;
}
.p2{
  padding-top: 30px;
  font-weight: 500;
  font-size: 16px;
}
.p3{
  padding-top: 30px;
  font-weight: 500;
  font-size: 15px;
  font-style: italic;
  text-align: left;
}
.support-ways{
  display: flex;
  justify-content: center;
  gap: 5%;
  margin-bottom: 25px;
  padding-top: 10px;
}
.support-ways img{
  width: 40px;
  height: 40px;
}
.support-ways img:hover{
  filter: brightness(0.7);
  cursor: pointer;
}
.close_support{
  position: absolute;
  right: 25px;
  top: 25px;
  transform: scale(2.2);
  cursor: pointer;
}
@keyframes fadeIn_Modal {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@media (max-width: 800px) {
  .modal-support{
    transform: scale(0.90);
    left: 0;
    width: 100%;
  }
  .containermodal{
    position: fixed;
  }
}
</style>