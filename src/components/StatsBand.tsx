import { CountUp } from "../lib/reveal";

export function StatsBand() {
  return (
    <section className="section grey">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">By the numbers</p>
          <h2>Authority measured in years, not adjectives.</h2>
        </div>
        <div className="stats reveal">
          <div className="stat">
            <div className="v">
              <CountUp end={18} />
            </div>
            <div className="l">Years of 24/7 operation</div>
            <div className="sub">continuously since 2008</div>
          </div>
          <div className="stat">
            <div className="v">24/7/365</div>
            <div className="l">SOC monitoring coverage</div>
            <div className="sub">no after-hours gaps</div>
          </div>
          <div className="stat">
            <div className="v">L3</div>
            <div className="l">CSIRT escalation tier</div>
            <div className="sub">detect · contain · remediate</div>
          </div>
          <div className="stat">
            <div className="v">
              <CountUp end={4} duration={1000} />
            </div>
            <div className="l">Core service lines</div>
            <div className="sub">SOC · CSIRT · VMS · advisory</div>
          </div>
        </div>
      </div>
    </section>
  );
}
