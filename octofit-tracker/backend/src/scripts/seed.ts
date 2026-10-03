import mongoose from 'mongoose'
import { connectDatabase } from '../config/database'
import Activity from '../models/Activity'
import Leaderboard from '../models/Leaderboard'
import Team from '../models/Team'
import User from '../models/User'
import Workout from '../models/Workout'

const ids = {
  users: {
    maya: new mongoose.Types.ObjectId('670000000000000000000001'),
    liam: new mongoose.Types.ObjectId('670000000000000000000002'),
    sofia: new mongoose.Types.ObjectId('670000000000000000000003'),
    noah: new mongoose.Types.ObjectId('670000000000000000000004'),
  },
  teams: {
    trailblazers: new mongoose.Types.ObjectId('670000000000000000000011'),
    paceMakers: new mongoose.Types.ObjectId('670000000000000000000012'),
  },
  activities: {
    mayaRun: new mongoose.Types.ObjectId('670000000000000000000021'),
    mayaRide: new mongoose.Types.ObjectId('670000000000000000000022'),
    liamSwim: new mongoose.Types.ObjectId('670000000000000000000023'),
    sofiaRide: new mongoose.Types.ObjectId('670000000000000000000024'),
    sofiaRun: new mongoose.Types.ObjectId('670000000000000000000025'),
    noahWalk: new mongoose.Types.ObjectId('670000000000000000000026'),
  },
  leaderboard: {
    maya: new mongoose.Types.ObjectId('670000000000000000000031'),
    liam: new mongoose.Types.ObjectId('670000000000000000000032'),
    sofia: new mongoose.Types.ObjectId('670000000000000000000033'),
    noah: new mongoose.Types.ObjectId('670000000000000000000034'),
  },
  workouts: {
    run: new mongoose.Types.ObjectId('670000000000000000000041'),
    strength: new mongoose.Types.ObjectId('670000000000000000000042'),
    mobility: new mongoose.Types.ObjectId('670000000000000000000043'),
    cycling: new mongoose.Types.ObjectId('670000000000000000000044'),
  },
}

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000)

/**
 * Seed the octofit_db database with test data.
 * Re-running this script replaces only these fixed-ID sample records.
 */
async function seedDatabase() {
  await connectDatabase()

  try {
    await Promise.all([
      Leaderboard.deleteMany({ _id: { $in: Object.values(ids.leaderboard) } }),
      Activity.deleteMany({ _id: { $in: Object.values(ids.activities) } }),
      Team.deleteMany({ _id: { $in: Object.values(ids.teams) } }),
      User.deleteMany({ _id: { $in: Object.values(ids.users) } }),
      Workout.deleteMany({ _id: { $in: Object.values(ids.workouts) } }),
    ])

    await User.insertMany([
      {
        _id: ids.users.maya,
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        name: 'Maya Chen',
      },
      {
        _id: ids.users.liam,
        username: 'liam.patel',
        email: 'liam.patel@example.com',
        name: 'Liam Patel',
      },
      {
        _id: ids.users.sofia,
        username: 'sofia.rivera',
        email: 'sofia.rivera@example.com',
        name: 'Sofia Rivera',
      },
      {
        _id: ids.users.noah,
        username: 'noah.brooks',
        email: 'noah.brooks@example.com',
        name: 'Noah Brooks',
      },
    ])

    await Team.insertMany([
      {
        _id: ids.teams.trailblazers,
        name: 'Trailblazers',
        members: [ids.users.maya, ids.users.liam],
      },
      {
        _id: ids.teams.paceMakers,
        name: 'Pace Makers',
        members: [ids.users.sofia, ids.users.noah],
      },
    ])

    await Activity.insertMany([
      {
        _id: ids.activities.mayaRun,
        user: ids.users.maya,
        activityType: 'Running',
        durationMinutes: 38,
        date: daysAgo(1),
        points: 120,
      },
      {
        _id: ids.activities.mayaRide,
        user: ids.users.maya,
        activityType: 'Cycling',
        durationMinutes: 45,
        date: daysAgo(4),
        points: 120,
      },
      {
        _id: ids.activities.liamSwim,
        user: ids.users.liam,
        activityType: 'Swimming',
        durationMinutes: 32,
        date: daysAgo(2),
        points: 180,
      },
      {
        _id: ids.activities.sofiaRide,
        user: ids.users.sofia,
        activityType: 'Cycling',
        durationMinutes: 55,
        date: daysAgo(1),
        points: 190,
      },
      {
        _id: ids.activities.sofiaRun,
        user: ids.users.sofia,
        activityType: 'Running',
        durationMinutes: 40,
        date: daysAgo(3),
        points: 130,
      },
      {
        _id: ids.activities.noahWalk,
        user: ids.users.noah,
        activityType: 'Walking',
        durationMinutes: 50,
        date: daysAgo(2),
        points: 150,
      },
    ])

    await Leaderboard.insertMany([
      {
        _id: ids.leaderboard.maya,
        user: ids.users.maya,
        team: ids.teams.trailblazers,
        points: 240,
        period: 'all-time',
      },
      {
        _id: ids.leaderboard.liam,
        user: ids.users.liam,
        team: ids.teams.trailblazers,
        points: 180,
        period: 'all-time',
      },
      {
        _id: ids.leaderboard.sofia,
        user: ids.users.sofia,
        team: ids.teams.paceMakers,
        points: 320,
        period: 'all-time',
      },
      {
        _id: ids.leaderboard.noah,
        user: ids.users.noah,
        team: ids.teams.paceMakers,
        points: 150,
        period: 'all-time',
      },
    ])

    await Workout.insertMany([
      {
        _id: ids.workouts.run,
        name: 'Easy 5K Run',
        description: 'A conversational-pace run to build aerobic endurance.',
        category: 'Running',
        durationMinutes: 35,
        difficulty: 'beginner',
      },
      {
        _id: ids.workouts.strength,
        name: 'Full-Body Strength',
        description: 'A balanced bodyweight circuit with squats, push-ups, and planks.',
        category: 'Strength',
        durationMinutes: 30,
        difficulty: 'intermediate',
      },
      {
        _id: ids.workouts.mobility,
        name: 'Recovery Mobility',
        description: 'Gentle stretches and mobility drills for a rest day.',
        category: 'Recovery',
        durationMinutes: 20,
        difficulty: 'beginner',
      },
      {
        _id: ids.workouts.cycling,
        name: 'Steady Cycling Intervals',
        description: 'Four controlled efforts with easy spinning between intervals.',
        category: 'Cycling',
        durationMinutes: 40,
        difficulty: 'advanced',
      },
    ])

    console.info('Database seeding complete')
  } finally {
    await mongoose.disconnect()
  }
}

void seedDatabase().catch((error: unknown) => {
  console.error('Error seeding octofit_db:', error)
  process.exitCode = 1
})
