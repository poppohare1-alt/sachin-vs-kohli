-- Players Table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    full_name VARCHAR(200),
    debut_date DATE,
    birth_date DATE,
    country VARCHAR(50),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Matches Table
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    match_date DATE NOT NULL,
    format VARCHAR(10) NOT NULL,
    opponent VARCHAR(100) NOT NULL,
    venue VARCHAR(200),
    city VARCHAR(100),
    country VARCHAR(50),
    match_type VARCHAR(50),
    match_result VARCHAR(20),
    toss_won BOOLEAN,
    batting_first BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Batting Performances Table
CREATE TABLE batting_performances (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    match_id INTEGER REFERENCES matches(id),
    innings_number INTEGER,
    runs_scored INTEGER,
    balls_faced INTEGER,
    minutes_batted INTEGER,
    fours INTEGER,
    sixes INTEGER,
    strike_rate DECIMAL(5,2),
    dismissal_type VARCHAR(50),
    position INTEGER,
    not_out BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bowling Performances Table
CREATE TABLE bowling_performances (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    match_id INTEGER REFERENCES matches(id),
    overs DECIMAL(4,1),
    maidens INTEGER,
    runs_conceded INTEGER,
    wickets INTEGER,
    economy DECIMAL(4,2),
    wides INTEGER,
    no_balls INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ball by Ball Data Table
CREATE TABLE ball_by_ball (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    player_id INTEGER REFERENCES players(id),
    innings INTEGER,
    over INTEGER,
    ball INTEGER,
    bowler VARCHAR(100),
    runs_scored INTEGER,
    extras INTEGER,
    wicket BOOLEAN DEFAULT FALSE,
    dismissal_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Awards & Milestones Table
CREATE TABLE awards (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    match_id INTEGER REFERENCES matches(id),
    award_type VARCHAR(50),
    milestone VARCHAR(200),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert players
INSERT INTO players (name, full_name, debut_date, country) VALUES
('Sachin Tendulkar', 'Sachin Ramesh Tendulkar', '1989-11-15', 'India'),
('Virat Kohli', 'Virat Kohli', '2008-08-18', 'India');

-- Create indexes for performance
CREATE INDEX idx_batting_player ON batting_performances(player_id);
CREATE INDEX idx_batting_match ON batting_performances(match_id);
CREATE INDEX idx_bowling_player ON bowling_performances(player_id);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_matches_format ON matches(format);
