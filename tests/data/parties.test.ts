import { describe, it, expect } from 'vitest'
import { politicalParties } from '~/data/parties'

describe('parties data', () => {
  it('exports politicalParties array', () => {
    expect(politicalParties).toBeDefined()
    expect(Array.isArray(politicalParties)).toBe(true)
    expect(politicalParties.length).toBeGreaterThan(0)
  })

  it('has expected political parties', () => {
    const partyIds = politicalParties.map(party => party.id)
    expect(partyIds).toContain('ldp')
    expect(partyIds).toContain('jcp')
    expect(partyIds).toContain('cdp')
  })

  it('all party entries have required properties', () => {
    politicalParties.forEach(party => {
      expect(party).toHaveProperty('id')
      expect(party).toHaveProperty('name')
      expect(party).toHaveProperty('nameEn')
      expect(party).toHaveProperty('founded')
      expect(party).toHaveProperty('description')
      expect(party).toHaveProperty('ideology')
      expect(party).toHaveProperty('policies')

      expect(typeof party.id).toBe('string')
      expect(typeof party.name).toBe('string')
      expect(typeof party.nameEn).toBe('string')
      expect(typeof party.founded).toBe('number')
      expect(typeof party.description).toBe('string')
    })
  })

  it('party names are not empty', () => {
    politicalParties.forEach(party => {
      expect(party.name.trim()).not.toBe('')
      expect(party.nameEn.trim()).not.toBe('')
    })
  })

  it('ideology structure is correct', () => {
    politicalParties.forEach(party => {
      expect(party.ideology).toHaveProperty('spectrum')
      expect(party.ideology).toHaveProperty('subIdeologies')
      expect(party.ideology).toHaveProperty('globalismStance')

      expect(typeof party.ideology.spectrum).toBe('string')
      expect(Array.isArray(party.ideology.subIdeologies)).toBe(true)
      expect(typeof party.ideology.globalismStance).toBe('string')
    })
  })

  it('contains main Japanese political parties', () => {
    const ldp = politicalParties.find(party => party.id === 'ldp')
    const jcp = politicalParties.find(party => party.id === 'jcp')

    expect(ldp?.name).toBe('自由民主党')
    expect(jcp?.name).toBe('日本共産党')
  })
})
