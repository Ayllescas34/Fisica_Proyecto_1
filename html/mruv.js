function calcularMRUV({ v0, vf, a, t, x }) {
  v0 = v0 !== "" ? parseFloat(v0) : null;
  vf = vf !== "" ? parseFloat(vf) : null;
  a  = a  !== "" ? parseFloat(a)  : null;
  t  = t  !== "" ? parseFloat(t)  : null;
  x  = x  !== "" ? parseFloat(x)  : null;
  let calculados = { v0, vf, a, t, x };
  let changed, intentos = 0;
  do {
    changed = false; intentos++;
    if (calculados.a == null) {
      if (calculados.vf != null && calculados.v0 != null && calculados.t != null) { calculados.a = (calculados.vf - calculados.v0) / calculados.t; changed = true; }
      if (calculados.x != null && calculados.v0 != null && calculados.t != null) { calculados.a = 2 * (calculados.x - calculados.v0 * calculados.t) / (calculados.t * calculados.t); changed = true; }
      if (calculados.vf != null && calculados.v0 != null && calculados.x != null) { calculados.a = (calculados.vf * calculados.vf - calculados.v0 * calculados.v0) / (2 * calculados.x); changed = true; }
    }
    if (calculados.vf == null) {
      if (calculados.v0 != null && calculados.a != null && calculados.t != null) { calculados.vf = calculados.v0 + calculados.a * calculados.t; changed = true; }
      if (calculados.v0 != null && calculados.x != null && calculados.t != null) { calculados.vf = (2 * calculados.x / calculados.t) - calculados.v0; changed = true; }
      if (calculados.v0 != null && calculados.a != null && calculados.x != null) {
        let sq = calculados.v0 * calculados.v0 + 2 * calculados.a * calculados.x;
        if (sq >= 0) { calculados.vf = Math.sqrt(sq); changed = true; }
      }
    }
    if (calculados.v0 == null) {
      if (calculados.vf != null && calculados.a != null && calculados.t != null) { calculados.v0 = calculados.vf - calculados.a * calculados.t; changed = true; }
      if (calculados.vf != null && calculados.x != null && calculados.t != null) { calculados.v0 = (2 * calculados.x / calculados.t) - calculados.vf; changed = true; }
      if (calculados.vf != null && calculados.a != null && calculados.x != null) {
        let sq = calculados.vf * calculados.vf - 2 * calculados.a * calculados.x;
        if (sq >= 0) { calculados.v0 = Math.sqrt(sq); changed = true; }
      }
    }
    if (calculados.t == null) {
      if (calculados.vf != null && calculados.v0 != null && calculados.a != null && calculados.a !== 0) { calculados.t = (calculados.vf - calculados.v0) / calculados.a; changed = true; }
      if (calculados.x != null && calculados.v0 != null && calculados.vf != null && (calculados.v0 + calculados.vf !== 0)) { calculados.t = (2 * calculados.x) / (calculados.v0 + calculados.vf); changed = true; }
      if (calculados.x != null && calculados.v0 != null && calculados.a != null && calculados.a !== 0) {
        let d = calculados.v0 * calculados.v0 + 2 * calculados.a * calculados.x;
        if (d >= 0) {
          let t1 = (-calculados.v0 + Math.sqrt(d)) / calculados.a;
          let t2 = (-calculados.v0 - Math.sqrt(d)) / calculados.a;
          if (t1 > 0 && t2 > 0) calculados.t = Math.min(t1, t2), changed = true;
          else if (t1 > 0) calculados.t = t1, changed = true;
          else if (t2 > 0) calculados.t = t2, changed = true;
        }
      }
    }
    if (calculados.x == null) {
      if (calculados.v0 != null && calculados.vf != null && calculados.t != null) { calculados.x = ((calculados.v0 + calculados.vf) / 2) * calculados.t; changed = true; }
      if (calculados.v0 != null && calculados.a != null && calculados.t != null) { calculados.x = calculados.v0 * calculados.t + 0.5 * calculados.a * calculados.t * calculados.t; changed = true; }
      if (calculados.vf != null && calculados.v0 != null && calculados.a != null && calculados.a !== 0) { calculados.x = (calculados.vf * calculados.vf - calculados.v0 * calculados.v0) / (2 * calculados.a); changed = true; }
    }
  } while (changed && intentos < 10);
  return calculados;
}
function animateResult(id) {
  const el = document.getElementById(id);
  el.classList.remove("animate-pulse");
  void el.offsetWidth;
  el.classList.add("animate-pulse");
  setTimeout(() => el.classList.remove("animate-pulse"), 400);
}
document.addEventListener("DOMContentLoaded", function() {
  const v0 = document.getElementById("input-v0");
  const vf = document.getElementById("input-vf");
  const a  = document.getElementById("input-a");
  const t  = document.getElementById("input-t");
  const x  = document.getElementById("input-x");
  const resV0 = document.getElementById("res-v0");
  const resVf = document.getElementById("res-vf");
  const resA  = document.getElementById("res-a");
  const resT  = document.getElementById("res-t");
  const resX  = document.getElementById("res-x");
  const carro = document.getElementById("carro");

  document.getElementById("form-mruv").addEventListener("submit", function(e) {
    e.preventDefault();
    const valores = {
      v0: v0.value,
      vf: vf.value,
      a:  a.value,
      t:  t.value,
      x:  x.value
    };
    const resultado = calcularMRUV(valores);

    if (v0.value === "") { resV0.textContent = (resultado.v0 !== null && !isNaN(resultado.v0)) ? resultado.v0.toFixed(2) : "—"; animateResult("res-v0"); }
    else { resV0.textContent = "-"; }
    if (vf.value === "") { resVf.textContent = (resultado.vf !== null && !isNaN(resultado.vf)) ? resultado.vf.toFixed(2) : "—"; animateResult("res-vf"); }
    else { resVf.textContent = "-"; }
    if (a.value === "") { resA.textContent = (resultado.a !== null && !isNaN(resultado.a)) ? resultado.a.toFixed(2) : "—"; animateResult("res-a"); }
    else { resA.textContent = "-"; }
    if (t.value === "") { resT.textContent = (resultado.t !== null && !isNaN(resultado.t)) ? resultado.t.toFixed(2) : "—"; animateResult("res-t"); }
    else { resT.textContent = "-"; }
    if (x.value === "") { resX.textContent = (resultado.x !== null && !isNaN(resultado.x)) ? resultado.x.toFixed(2) : "—"; animateResult("res-x"); }
    else { resX.textContent = "-"; }

    // Animación carro Visual:
    let pista = document.getElementById("mruv-simulador");
    let pistaW = pista.offsetWidth - 60; // 60 pixeles para padding y objeto
    let maxDist = 100; // 100 "unidades" máximo en pista
    let rel = resultado.x && resultado.x > 0 ? Math.min(resultado.x, maxDist)/maxDist : 0;
    carro.style.left = (rel * pistaW) + "px";
  });
});