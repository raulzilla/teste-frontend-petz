/* istanbul ignore file */
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useState, MouseEvent, useEffect, FocusEvent, FormEvent } from 'react';
import styles from '@/styles/consultation-schedule.module.css';
import Header from '@/components/header';
import Nav from '@/components/nav';
import TextField from '@/components/text-field';
import SelectField from '@/components/select-field';
import Button from '@/components/button';
import service from '@/service/index';
import { useRouter } from 'next/router';
import { convertForCoin } from '@/utils/index';
import { ModalProps } from '@/components/modal';

const inter = Inter({ subsets: ['latin'] })

type DataTypes = [] | string[]

interface GenerationTypes {
  name: string,
  generation: number
}

interface InputPokemon {
  input: string;
  pokemon: string;
}

interface Form {
  listPokemon?: InputPokemon[],
  name?: string,
  lastName?: string,
  region?: string,
  cidade?: string,
  date?: string,
  time?: string
}

export default function ConsultationSchedule() {
  const router = useRouter();
  const [dataLocal, setDataLocal] = useState<DataTypes>([])
  const [timeLocal, setTimeLocal] = useState<DataTypes>([])
  const [locationOnline, setLocationOnline] = useState<DataTypes>([])
  const [regionOnline, setRegionOnline] = useState<DataTypes>([])
  const [pokemonOnline, setPokemonsOnline] = useState<DataTypes>([])
  const [pokemonGenerationOnline, setPokemonGenerationOnline] = useState<GenerationTypes[]>([])
  const [currentDate, setCurrentDate] = useState<string | null>(null)

  const [listInputsPokemon, setListInputsPokemon] = useState(['Pokemon 01'])
  const [listPokemon, setListPokemon] = useState<{ input: string, pokemon: string }[] | []>([])

  const [formData, setFormData] = useState<Form>({});

  const addNewPokemon = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (listInputsPokemon.length < 6) {
      const newPokemon = [...listInputsPokemon, `Pokemon 0${listInputsPokemon.length + 1}`];
      setListInputsPokemon(newPokemon);
    }
  }

  const handleDate = async (e: FocusEvent<HTMLInputElement, Element>) => {
    setCurrentDate(e.target.value)
    setTimeLocal(await service.local.fetchTime(e.target.value))
  }

  const handleListPokemon = (input: string, pokemon: string) => {
    const existingIndex = listPokemon.findIndex(obj => obj.input === input);

    if (existingIndex !== -1) {
      const updatedList = [...listPokemon];
      updatedList[existingIndex] = { ...updatedList[existingIndex], pokemon };
      setListPokemon(updatedList);
    } else {
      setListPokemon([...listPokemon, { input, pokemon }]);
    }
  }

  const setOption = (data: string[]) => {
    return data.map(option => {
      return {
        label: option,
        value: option
      }
    })
  }

  let currentGeneration = -1;

  const maxGeneration = (data: GenerationTypes[]) => {
    return data.map((item, index) => {
      if (item.generation > currentGeneration) {
        currentGeneration = item.generation;
      }

      const pokemonListSize = listPokemon.map(item => listInputsPokemon.includes(item.input) && item.pokemon.length > 0).length

      if (data.length === index + pokemonListSize) {
        let taxPercentage = (currentGeneration * 3) / 100
        if (taxPercentage > 0.3) {
          taxPercentage = 0.3
        }

        return taxPercentage * totalValue
      }
    })[0];
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>, feedback: ModalProps['kind']) => {
    e.preventDefault()
    console.log(formData)
    router.push({
      pathname: '/consultation-schedule/feedback',
      query: {
        feedback,
        title: 'Consulta Agendada',
        subtitle: `Seu agendamento para dia ${formData.date}, às ${formData.time}, para ${formData.listPokemon?.length}x pokémons foi realizado com sucesso!`
      },
    })
  }

  const valuePerPokemon = 70
  const totalValue = listPokemon.length * valuePerPokemon

  const purchaseSummary = {
    quantity: listPokemon.length,
    subTotal: `R$ ${totalValue},00`,
    tax: convertForCoin(maxGeneration(pokemonGenerationOnline)),
    total: convertForCoin(totalValue + (maxGeneration(pokemonGenerationOnline) ?? 0))
  }

  useEffect(() => {
    (async () => {
      setDataLocal(await service.local.fetchDate())
      setLocationOnline(await service.online.fetchLocation())
      setRegionOnline(await service.online.fetchRegion())
      setPokemonsOnline(await service.online.fetchPokemons())
    })();
  }, [])

  useEffect(() => {
    if (listPokemon.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        listPokemon
      }));

      (async () => {
        const generation = await Promise.all(listPokemon.map(async list => {
          return await service.online.fetchPokemonGeneration(list.pokemon)
        }))

        setPokemonGenerationOnline(generation as typeof pokemonGenerationOnline)
      })();
    }
  }, [listPokemon])

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  return (
    <>
      <Head>
        <title>Agendar Consulta</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <Header />
        <main className={styles.main}>
          <Nav
            title='Agendar consulta'
            subtitle='Recupere seus pokémons em 5 segundos'
            breadcrumb={['Home', 'Agendar consulta']}
          />
          <h2 className={styles.title}>
            Preencha o formulário abaixo para agendar sua consulta
          </h2>
          <form method="post" onSubmit={(e) => handleSubmit(e, 'success')} className={styles.form}>
            <div role='region' className={`${styles.container} ${styles.containerColumn2}`}>
              <TextField
                label='Name'
                placeholder='Digite seu nome'
                onChange={(e) => handleChange('name', e.target.value)}
              ></TextField>
              <TextField
                label='Sobrenome'
                placeholder='Digite seu sobrenome'
                onChange={(e) => handleChange('lastName', e.target.value)}
              ></TextField>
              <SelectField
                label='Região'
                onSelectInput={(value) => handleChange('region', value)}
                placeholder='Selecione sua região'
                options={setOption(regionOnline)}
              />
              <SelectField
                label='Cidade'
                onSelectInput={(value) => handleChange('cidade', value)}
                placeholder='Selecione sua cidade'
                options={setOption(locationOnline)}
              />
            </div>
            <div className={`${styles.container} ${styles.containerColumn1}`}>
              <div role='region' className={styles.section}>
                <p className={styles.text}><b>Cadastre seu time</b></p>
                <p>Atendemos até 06 pokémons por vez</p>
              </div>
              {listInputsPokemon.map((pokemon, index) => (
                <SelectField
                  key={`${pokemon}-${index}`}
                  label={pokemon}
                  isInline
                  placeholder='Selecione seu pokémon'
                  onSelectInput={(value) => handleListPokemon(pokemon, value)}
                  options={setOption(pokemonOnline)}
                />
              ))}
              <Button className={styles.button} type="button" kind='outline' onClick={(e) => addNewPokemon(e)}>
                Adicionar novo pokémon ao time... +
              </Button>
            </div>
            <div className={`${styles.container} ${styles.containerColumn2}`}>
              <SelectField
                label='Data para atendimento'
                placeholder='Selecione uma data'
                onBlur={(e) => handleDate(e)}
                onSelectInput={(value) => handleChange('date', value)}
                options={setOption(dataLocal)}
              />
              <SelectField
                label='Horário de Atendimento'
                placeholder='Selecione um horário'
                disabled={typeof currentDate !== 'string'}
                onSelectInput={(value) => handleChange('time', value)}
                options={setOption(timeLocal)}
              />
            </div>
            <hr className={styles.divider} />
            <dl>
              <div className={styles.dataListContainer}>
                <dt>Número de pokémons a serem atendidos:</dt>
                <dd>{purchaseSummary.quantity}</dd>
              </div>
              <div className={styles.dataListContainer}>
                <dt>Atendimento unitário por pokémon:</dt>
                <dd>R$ 70,00</dd>
              </div>
              <div className={styles.dataListContainer}>
                <dt>Subtotal:</dt>
                <dd>{purchaseSummary.subTotal}</dd>
              </div>
              <div className={styles.dataListContainer}>
                <dt>Taxa geracional*:</dt>
                <dd>{purchaseSummary.tax}</dd>
              </div>
            </dl>
            <small className={styles.description}>
              *adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%
            </small>
            <div className={styles.submitContainer}>
              <h3>
                Valor Total: {purchaseSummary.total}
              </h3>
              <Button
                type='submit'
                disabled={Object.values(formData).length !== 7}
              >
                Concluir Agendamento
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
