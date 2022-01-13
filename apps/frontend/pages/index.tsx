import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { ICallCost } from '@loldesign/interfaces';
import useCallCosts from '../src/usecase/load-call-costs';
import usePlans from '../src/usecase/load-plans';
import useCalculatePriceWithPlan from '../src/usecase/calculate-price-with-plan';

export default function Home() {
  const {
    status: plansQueryStatus,
    data: plans,
    error: plansQueryError,
    isFetching: isPlansQueryFetching,
  } = usePlans();

  const {
    status: callCostsQueryStatus,
    data: callCosts,
    error: callCostsQueryError,
    isFetching: isCallCostsQueryFetching,
  } = useCallCosts();

  const [callCostSelected, setCallCostSelected] = useState(null);
  const [minutesSelected, setMinutesSelected] = useState(30);
  const [planSelected, setPlanSelected] = useState(
    plansQueryStatus === 'success' ? plans[0].id : null
  );

  if (plansQueryStatus === 'success' && !planSelected) {
    console.log(`a`);
    setPlanSelected(plans[0].id);
  } else if (callCostsQueryStatus === 'success' && !callCostSelected) {
    setCallCostSelected(callCosts[0].id);
  }

  const {
    status: calculatedPriceQueryStatus,
    data: calculatedPrice,
    error: calculatedPriceQueryError,
    isFetching: isCalculatedPriceQueryFetching,
    refetch,
  } = useCalculatePriceWithPlan(
    planSelected,
    callCostSelected,
    minutesSelected
  );

  console.log(calculatedPriceQueryStatus, calculatedPrice);

  const optionChangeListener = (
    value,
    type: 'callCost' | 'minutes' | 'plan'
  ) => {
    const statesToCall = {
      callCost: (value) => setCallCostSelected(value),
      plan: (value) => setPlanSelected(value),
      minutes: (value) => setMinutesSelected(value),
    };
    statesToCall[type](value);
    console.log(`type: ${type} value: ${value}`);
  };

  return (
    <div className="home container">
      <div className="navbar">
        <div className="navbar-container">
          <Image
            width="50px"
            height="44px"
            layout="fixed"
            objectFit="cover"
            src="/img/logo.png"
            alt="Logo LOLDesign"
          />

          <ul className="navbar-items">
            <li className="navbar-item">
              <Link href="/#plans">Planos</Link>
            </li>
            <li className="navbar-item">
              <Link href="/#calculate-costs">Calcular Custos</Link>
            </li>
          </ul>
        </div>
      </div>
      <section id="plans" className="plans plans-container">
        <h1 className="title">
          <span>Planos</span>:
        </h1>

        {plansQueryStatus === 'loading' ? (
          'Carregando planos...'
        ) : plansQueryStatus === 'error' ? (
          <span>Erro: {plansQueryError['message']}</span>
        ) : (
          <div className="plans-wrapper">
            {plans.map((plan) => (
              <div key={plan.id} className="plan">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-free-minutes">
                  {plan.free_minutes} minutos gratuitos
                </p>
                <Link href="/#calculate-costs">
                  <a className="plan-calculate-price">Calcular custos</a>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div id="calculate-costs" className="calculate-price">
          <h1 className="title">
            Calcule <span>Custos</span>:
          </h1>

          {callCostsQueryStatus === 'loading' ? (
            'Carregando origens...'
          ) : callCostsQueryStatus === 'error' ? (
            <span>Erro: {callCostsQueryError['message']}</span>
          ) : (
            <>
              <div className="options">
                <div className="option">
                  <label htmlFor="origin-and-destiny">Origem & Destino:</label>
                  <select
                    onChange={({ target: { value } }) =>
                      optionChangeListener(value, 'callCost')
                    }
                    name="origin-and-destiny"
                    id="origin-and-destiny"
                  >
                    {callCosts.map((callCost: ICallCost) => (
                      <option
                        key={callCost.id}
                        className="plan-option"
                        value={callCost.id}
                      >
                        {callCost.origin} - {callCost.destiny}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="option">
                  <label htmlFor="minutes">Minutos:</label>
                  <input
                    type="number"
                    onChange={({ target: { value } }) =>
                      optionChangeListener(+value, 'minutes')
                    }
                    disabled={!callCostSelected}
                    name="minutes"
                    id="minutes"
                    defaultValue={30}
                  />
                </div>

                <div className="option">
                  <label htmlFor="plan">Plano escolhido:</label>
                  <select
                    onChange={({ target: { value } }) =>
                      optionChangeListener(value, 'plan')
                    }
                    disabled={!callCostSelected || !minutesSelected}
                    name="plan"
                    id="plan"
                  >
                    {plansQueryStatus === 'loading' ? (
                      'Carregando planos...'
                    ) : plansQueryStatus === 'error' ? (
                      <span>Erro: {plansQueryError['message']}</span>
                    ) : (
                      plans.map((plan) => (
                        <option
                          key={plan.id}
                          className="plan-option"
                          value={plan.id}
                        >
                          {plan.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="option">
                  <button onClick={() => refetch()}>Calcular</button>
                </div>
              </div>

              {calculatedPriceQueryStatus === 'loading' ? (
                'Carregando planos...'
              ) : calculatedPriceQueryStatus === 'idle' ? (
                <span>Preencha os campos acima para ver seu resultado.</span>
              ) : calculatedPriceQueryStatus === 'error' ? (
                <span>Erro: {calculatedPriceQueryError['message']}</span>
              ) : (
                <div className="result">
                  <p className="price-with-plan">
                    <span>Preço com o plano: </span>
                    R$ {calculatedPrice.price_with_plan}
                  </p>
                  <p className="price-without-plan">
                    <span>Preço sem o plano: </span>
                    R$ {calculatedPrice.price_without_plan}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
